class LocalStorage {
  constructor() {}

  getKey = (key) => localStorage.getItem(key);

  setKey = (key, value) => localStorage.setItem(key, value);

  remove = (key) => localStorage.removeItem(key);
}

export { LocalStorage };
