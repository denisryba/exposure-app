require('dotenv').config();

const MONGO_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET;

module.exports = {
  MONGO_URL,
  PORT,
  SECRET
};