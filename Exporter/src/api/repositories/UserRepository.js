import BaseRepository from './BaseRepository';
import { UserModel } from '../models';

export default class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }
}
