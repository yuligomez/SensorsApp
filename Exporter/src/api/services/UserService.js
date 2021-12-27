import BaseService from './BaseService';
import { v4 as uuidv4 } from 'uuid';

export default class UserService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  async create(data) {
    try {
      const newUuid = uuidv4();
      const newUser = {
        email: data.email,
        token: newUuid
      };
      return await this.repository.create(newUser);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async findByEmail(email) {
    return await this.repository.findOne({
      email: email
    });
  }

  async updateStartAt(user, startAt) {
    user.startAt = startAt;
    return await this.repository.updateOneById(user.id, user);
  }
}
