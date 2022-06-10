const Pool = require('pg').Pool;
require('dotenv').config(); 


const pool = new Pool({
  user: 'levi',
  host: 'localhost',
  database: 'reviews',
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})
//`SELECT id, url FROM photos WHERE review_id=${reviewId} `
const getPhotos = async (reviewId = 5) => {
 return await pool.query(`
 SELECT url, id, review_id FROM photos where review_id = ANY (SELECT id FROM review WHERE id <= 20)
 `)
}
//;

const getReviews = async () => {
  return await pool.query(`SELECT * FROM review WHERE id <= 20`);
}

const addPhotos = (id, review_id, url) => {
  //console.log(review_id, url)
  pool.query(`
  INSERT INTO photos (id, review_id, url) VALUES (${id}, ${review_id}, '${url}')
  `)
  pool.end;
}

const addCharacteristic = async ( id, char_id, review_id, value) => {
  await pool.query(`
  INSERT INTO characteristics (id, characteristic_id, review_id, value) 
  VALUES (${id}, ${char_id}, ${review_id}, ${value})
  `).then((res) => {

  }).catch(err => console.log(err));
  await pool.end;
}

module.exports = {
  getPhotos,
  addPhotos, 
  addCharacteristic,
  getReviews,
  pool
};