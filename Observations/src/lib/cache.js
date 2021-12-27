export class Cache {
  constructor() {
    this.memo = new Map();
  }

  add(key, value) {
    this.memo.set(key, new Set(value));
    return this;
  }

  addValues(value, keys) {
    keys.forEach((key) => {
      if (this.has(key)) return this.add(key, this.get(key).add(value));

      this.add(key, [value]);
    });

    return this;
  }

  delete(key) {
    this.memo.delete(key);
    return this;
  }

  deleteValue(value) {
    this.memo.forEach((values) => {
      values.delete(value);
    });

    return this;
  }

  get(key) {
    return this.memo.get(key);
  }

  has(key) {
    return this.memo.has(key);
  }

  update(key, oldKey, value) {
    this.delete(oldKey);
    return this.add(key, value);
  }

  updateValues(value, oldValue, keys) {
    this.deleteValue(oldValue);
    return this.addValues(value, keys);
  }

  size() {
    return this.memo.size;
  }
}
