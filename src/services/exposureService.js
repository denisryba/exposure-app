import axios from 'axios';
import storage from '../utils/storage.js';

const API_URL = 'http://localhost:3001/api';

const getRequestConfig = (params) => {
  const token = storage.get('savedUser').token;

  return {
    headers: {
      Authorization: `Bearer ${token}`  
    },
    params
  } 
};

const getData = async (path, params) => {
  const res = await axios.get(`${API_URL}/${path}`, getRequestConfig(params));
  return res;
};

const postData = async (path, data, params) => {
  const res = await axios.post(`${API_URL}/${path}`, data, getRequestConfig(params));
  return res;
};

const putData = async (path, data, params) => {
  const res = await axios.put(`${API_URL}/${path}`, data, getRequestConfig(params));
  return res;
};

const deleteData = async (path, params) => {
  const res = await axios.delete(`${API_URL}/${path}`, getRequestConfig(params));
  return res;
};

const getAll = async (collection) => {
  const res = await getData(collection);
  return res.data;
};

const get = async (docName, id, params) => {
  const res = await getData(`${docName}s/${id}`, params);
  return res.data;
};

const getAllTasksFromPlan = async (id) => await getAll(`plans/${id}/tasks`);

const getPlanForEmployee = async (id) => {
  const res = await getData('plans', { employee: id });
  return res.data;
};

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
  getPlanForEmployee,
  create,
  update,
  remove
};