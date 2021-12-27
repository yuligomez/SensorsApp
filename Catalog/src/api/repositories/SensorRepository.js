import BaseRepository from './BaseRepository';
import { SensorModel } from '../models';

export default class SensorRepository extends BaseRepository {
  constructor() {
    super(SensorModel);
  }
}
