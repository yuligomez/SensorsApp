export default class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async findOne(query) {
    try {
      return this.repository.findOne(query);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async find(query, sort) {
    try {
      return this.repository.find(query, sort);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async updateOneById(id, data) {
    try {
      return this.repository.updateOneById(id, data);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async count(query) {
    try {
      return this.repository.count(query);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async create(data) {
    try {
      return this.repository.create(data);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async createMany(data) {
    try {
      return this.repository.create(data);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }

  async deleteOneById(id) {
    try {
      return this.repository.deleteOneById(id);
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }
}
