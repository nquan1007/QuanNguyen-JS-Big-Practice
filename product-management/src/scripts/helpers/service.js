class LocalStorage {
  constructor() {}

  getKey = (key) => localStorage.getItem(key);

  setKey = (key, value) => localStorage.setItem(key, value);
}

export { LocalStorage };
