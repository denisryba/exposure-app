import axios from 'axios';
import storage from '../utils/storage.js';

const API_URL = 'http://localhost:3001/api';

const getRequestConfig = () => {
  const token = storage.get('savedUser').token;

  return {
    headers: {
      Authorization: `Bearer ${token}`  
    }
  } 
};

const getData = async (path) => {
  const res = await axios.get(`${API_URL}/${path}`, getRequestConfig());
  return res;
};

const postData = async (path, data) => {
  const res = await axios.post(`${API_URL}/${path}`, data, getRequestConfig());
  return res;
};

const putData = async (path, data) => {
  const res = await axios.put(`${API_URL}/${path}`, data, getRequestConfig());
  return res;
};

const deleteData = async (path) => {
  const res = await axios.delete(`${API_URL}/${path}`, getRequestConfig());
  return res;
};

const getAll = async (collection) => {
  const res = await getData(collection);
  return res.data;
};

const get = async (docName, id) => {
  const res = await getData(`${docName}s/${id}`);
  return res.data;
};

const getAllTasksFromPlan = async (id) => await getAll(`plans/${id}/tasks`);

const create = async (docName, newObject) => {
  const res = await postData(`${docName}s`, newObject);
  return res.data;
};

const update = async (docName, id, newObject) => {
  const res = await putData(`${docName}s/${id}`, newObject);
  return res.data;
};

const remove = async (docName, id) => {
  return await deleteData(`${docName}s/${id}`);
};

export default {
  getAll,
  get,
  getAllTasksFromPlan,
  create,
  update,
  remove
};