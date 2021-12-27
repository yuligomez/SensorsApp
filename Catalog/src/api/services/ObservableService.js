import BaseService from './BaseService';
import difference from 'lodash/difference';
import { Types } from 'mongoose';

export default class ObservableService extends BaseService {
  #sensorRepository = null;
  #observableRepository = null;
  #publisher = null;

  constructor(observableRepository, sensorRepository, publisher) {
    super(observableRepository);

    this.#observableRepository = observableRepository;
    this.#sensorRepository = sensorRepository;
    this.#publisher = publisher;
  }

  async create(data) {
    try {
      const newSensors = data.sensors || [];

      const sensorExists = await this.#sensorRepository.find({
        _id: { $in: newSensors.map((sensor) => Types.ObjectId(sensor)) }
      });

      if (newSensors.length > 0 && sensorExists.length === 0)
        throw new Error("Sensor doesn't exist");

      const newObservable = await this.#observableRepository.create(data);
      const { _id, name, minValue, maxValue, sensors } = newObservable;

      await this.#sensorRepository.updateMany(_id, sensors, 'observables', '$push');

      const newObservablePopulated = await this.#observableRepository.findByIdPopulated(_id, 'sensors');
      const { sensors: sensorsPopulated } = newObservablePopulated;

      this.#publisher.publish('add', {
        name,
        range: { minValue, maxValue },
        sensors: sensorsPopulated.map((sensor) => sensor.esn)
      });

      return newObservablePopulated;
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async deleteOneById(id) {
    const { name = '', sensors = [] } = (await this.#observableRepository.findById(id)) ?? {};
    const result = await this.#observableRepository.deleteOneById(id);

    if (sensors.length > 0)
      await this.#sensorRepository.updateMany(id, sensors, 'observables', '$pull');

    if (result) this.#publisher.publish('delete', { name });

    return result;
  }

  async updateOneById(id, data) {
    try {
      const newSensors = data.sensors || [];
      const dataToUpdate = { ...data, sensors: newSensors };

      const sensorExists = await this.#sensorRepository.find({
        _id: { $in: newSensors.map((sensor) => Types.ObjectId(sensor)) }
      });

      if (newSensors.length > 0 && sensorExists.length === 0)
        throw new Error("Sensor doesn't exist");

      const result = await this.#observableRepository.updateOneById(id, dataToUpdate);

      if (!result) throw new Error("Observable Property doesn't exist");

      const { _id, name: oldName, sensors } = result;

      const oldSensors = sensors.map((sensor) => sensor.toString());

      const added = difference(newSensors, oldSensors);
      const removed = difference(oldSensors, newSensors);

      await this.#sensorRepository.updateMany(_id, added, 'observables', '$push');
      await this.#sensorRepository.updateMany(_id, removed, 'observables', '$pull');

      const newObservablePopulated = await this.#observableRepository.findByIdPopulated(_id, 'sensors');
      const { name, minValue, maxValue, sensors: sensorsPopulated } = newObservablePopulated;

      this.#publisher.publish('update', {
        oldName,
        name,
        range: { minValue, maxValue },
        sensors: sensorsPopulated.map((sensor) => sensor.esn)
      });

      return result;
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }
}
