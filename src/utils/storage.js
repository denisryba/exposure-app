const get = (key) => {
  const item = window.localStorage.getItem(key);
  return JSON.parse(item);
};

const set = (key, item) => {
  const jsonItem = JSON.stringify(item);
  window.localStorage.setItem(key, jsonItem)
};

const remove = (key) => {
  window.localStorage.removeItem(key);
};

export default {
  get,
  set,
  remove
};