import axios from 'axios';
const API_URL = 'http://localhost:3001/api'

const getData = async (path) => {
  const res = await axios.get(`${API_URL}/${path}`);
  return res;
};

const postData = async (path, data) => {
  const res = await axios.post(`${API_URL}/${path}`, data);
  return res;
};

const putData = async (path, data) => {
  const res = await axios.put(`${API_URL}/${path}`, data);
  return res;
};

const deleteData = async (path) => {
  const res = await axios.delete(`${API_URL}/${path}`);
  return res;
};

const getAll = async (collection) => {
  const res = await getData(collection);
  return res.data;
};

const get = async (docName, id) => {
  const res = await getData(`${docName}s/${id}`);
  return res.data;
}

const create = async (docName, newObject) => {
  const res = await postData(`${docName}s`, newObject);
  return res.data;
};

const update = async (docName, id, newObject) => {
  const res = await putData(`${docName}s/${id}`, newObject);
  return res.data;
};

const remove = async (docName, id) => {
  const res = await deleteData(`${docName}s/${id}`);
  console.log(res);
  return res.data;
};

export default {
  getAll,
  get,
  create,
  update,
  remove
};