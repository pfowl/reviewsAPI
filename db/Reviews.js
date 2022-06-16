const Pool = require('pg').Pool;
require('dotenv').config(); 


const Reviews = new Pool({
  user: 'postgres',
  host: '54.221.132.238',
  database: 'reviews',
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = {
  Reviews
};

