export default class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async findOne(query) {
    return this.repository.findOne(query);
  }

  async find(query, sort) {
    return this.repository.find(query, sort);
  }

  async findById(id) {
    return this.repository.findById(id);
  }

  async updateOneById(id, data) {
    return this.repository.updateOneById(id, data);
  }

  async count(query) {
    return this.repository.count(query);
  }

  async create(data) {
    return this.repository.create(data);
  }

  async createMany(data) {
    return this.repository.create(data);
  }

  async deleteOneById(id) {
    return this.repository.deleteOneById(id);
  }
}
