import BaseService from './BaseService';
import filters from '../filters';
import { Op, Sequelize } from 'sequelize';
import { getQuery } from './utils';

export default class DataSensorService extends BaseService {
  #publisher = null;

  constructor(repository, publisher) {
    super(repository);

    this.#publisher = publisher;
  }

  async create(data) {
    try {
      const dataFiltered = filters(data);
      const newData = await this.repository.create(dataFiltered);
      this.#publisher.publish(dataFiltered);

      return newData;
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async find(request) {
    try {
      const {
        query: { startdate, enddate, esn = '', property = '', time = '' }
      } = request;

      const startTimestamp = new Date(startdate).toLocaleDateString('en-CA');
      const end = new Date(enddate);
      const endTimestamp = new Date(end.setUTCDate(end.getUTCDate() + 1)).toLocaleDateString(
        'en-CA'
      );

      const queryDates = {
        createdAt: {
          [Op.between]: [startTimestamp, endTimestamp]
        }
      };

      if (!esn) return await this.repository.find({ where: queryDates });

      const valuesSensors = await this.repository.find({
        where: {
          [Op.and]: [
            { esn: esn },
            {
              createdAt: {
                [Op.between]: [startTimestamp, endTimestamp]
              }
            },
            { observableProperty: property }
          ]
        },
        order: [[Sequelize.fn('date_trunc', time, Sequelize.col('createdAt')), 'DESC']],
        ...getQuery(time)
      });

      return valuesSensors;
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }
}
