import BaseRepository from './BaseRepository';
import { EmailModel } from '../models';

export default class EmailRepository extends BaseRepository {
  constructor() {
    super(EmailModel);
  }
}
