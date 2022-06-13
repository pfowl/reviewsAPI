const Pool = require('pg').Pool;
require('dotenv').config(); 


const Reviews = new Pool({
  user: 'levi',
  host: 'localhost',
  database: 'reviews',
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = {
  Reviews
};

