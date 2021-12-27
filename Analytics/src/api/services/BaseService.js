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
      const result = await this.repository.updateOneById(id, data);

      if (!result) throw new Error(`ID: ${id} not found`);
      return result;
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
      const newEmail = await this.repository.create(data);
      return newEmail;
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
      const result = await this.repository.deleteOneById(id);
      if (!result) throw new Error(`ID: ${id} not found`);
      return result;
    } catch (error) {
      console.error('[SERVICE]', error);
      return new Error(error);
    }
  }
}
