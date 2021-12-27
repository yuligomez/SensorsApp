export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findOne(query) {
    try {
      return this.model.findOne(query).exec();
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async find(query, sort) {
    try {
      return this.model.find(query, null, sort).exec();
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async findById(id) {
    try {
      return this.model.findById(id);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async count(query) {
    try {
      return this.model.count(query).exec();
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
      return this.model.create(data);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async updateMany(id, relation, entity, operation) {
    try {
      return this.model.updateMany({ _id: relation }, { [operation]: { [entity]: id } });
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async deleteOneById(id) {
    try {
      return this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }

  async updateOneById(id, data) {
    try {
      return this.model.findByIdAndUpdate(id, data);
    } catch (error) {
      console.error('[DB]', error);
      return new Error(error);
    }
  }
}
