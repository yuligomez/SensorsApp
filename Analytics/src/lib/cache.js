export class Cache {
  constructor() {
    this.memo = new Map();
  }

  add(key, value) {
    this.memo.set(key, value);
    return this;
  }

  delete(key) {
    this.memo.delete(key);
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

  size() {
    return this.memo.size;
  }
}
