import BaseRepository from './BaseRepository';
import { ObservableModel } from '../models';

export default class ObservableRepository extends BaseRepository {
  constructor() {
    super(ObservableModel);
  }
}
