import axios from 'axios';

const URL = 'http://localhost:3001/api/login';

const login = async (userData) => {
  const res = await axios.post(URL, userData);
  return res.data;
};

export default {
  login
};