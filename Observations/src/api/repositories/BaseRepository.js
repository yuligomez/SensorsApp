export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findOne(query) {
    try {
      return this.model.findOne(query);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async find(query, sort) {
    try {
      return this.model.findAll(query);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async findById(id) {
    try {
      return this.model.findByPk(id);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async count(query) {
    try {
      return this.model.count(query);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async create(data) {
    try {
      return this.model.create(data);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async createMany(data) {
    try {
      return this.model.bulkCreate(data);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async deleteOneById(id) {
    try {
      return this.model.destroy({
        where: {
          id
        }
      });
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async updateOneById(id, data) {
    try {
      return this.model.update(data, {
        where: {
          id
        }
      });
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }
}
