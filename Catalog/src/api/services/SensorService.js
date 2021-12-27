import { Types } from 'mongoose';
import difference from 'lodash/difference';
import BaseService from './BaseService';

export default class SensorService extends BaseService {
  #sensorRepository = null;
  #observableRepository = null;
  #publisher = null;

  constructor(sensorRepository, observableRepository, publisher) {
    super(sensorRepository);

    this.#sensorRepository = sensorRepository;
    this.#observableRepository = observableRepository;
    this.#publisher = publisher;
  }

  async create(data) {
    try {
      const newObservables = data.observables || [];

      const observableExists = await this.#observableRepository.find({
        _id: { $in: newObservables.map((observable) => Types.ObjectId(observable)) }
      });

      if (newObservables.length > 0 && observableExists.length === 0)
        throw new Error("Observable Property doesn't exist");

      const newSensor = await this.#sensorRepository.create(data);
      const { _id, esn, observables } = newSensor;

      await this.#observableRepository.updateMany(_id, observables, 'sensors', '$push');

      const newSensorPopulated = await this.#sensorRepository.findByIdPopulated(_id, 'observables');
      const { observables: observablesPopulated } = newSensorPopulated;

      this.#publisher.publish('add', {
        esn,
        observables: observablesPopulated.map((observable) => observable.name)
      });

      return newSensorPopulated;
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async deleteOneById(id) {
    const { esn, observables = [] } = (await this.#sensorRepository.findById(id)) ?? {};

    const result = await this.#sensorRepository.deleteOneById(id);

    if (observables.length > 0)
      this.#sensorRepository.updateMany(id, observables, 'sensors', '$pull');

    this.#publisher.publish('delete', { esn });
    return result;
  }

  async updateOneById(id, data) {
    try {
      const newObservables = data.observables || [];
      const dataToUpdate = { ...data, observables: newObservables };
      
      const observablesExists = await this.#observableRepository.find({
        _id: { $in: newObservables.map((observable) => Types.ObjectId(observable)) }
      });

      if (newObservables.length > 0 && observablesExists.length === 0)
        throw new Error("Observable Property doesn't exist");

      const result = await this.#sensorRepository.updateOneById(id, dataToUpdate);

      if (!result) throw new Error("Sensor doesn't exist");

      const { _id, esn: oldEsn, observables } = result;
      const oldObservables = observables.map((observable) => observable.toString());

      const added = difference(newObservables, oldObservables);
      const removed = difference(oldObservables, newObservables);

      await this.#observableRepository.updateMany(_id, added, 'sensors', '$push');
      await this.#observableRepository.updateMany(_id, removed, 'sensors', '$pull');

      const newSensorPopulated = await this.#sensorRepository.findByIdPopulated(_id, 'observables');
      const { esn, observables: observablesPopulated } = newSensorPopulated;

      this.#publisher.publish('update', {
        oldEsn,
        esn,
        observables: observablesPopulated.map((observable) => observable.name)
      });

      return result;
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }
}
