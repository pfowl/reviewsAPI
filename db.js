const Pool = require('pg').Pool;
require('dotenv').config(); 


const pool = new Pool({
  user: 'levi',
  host: 'localhost',
  database: 'reviews',
  password: process.env.DB_PASS,
  port: process.env.PORT,
})

const getPhotos = async () => {
 let res = await pool.query('SELECT * FROM photos WHERE review_id = 10')
 console.log(res.rows)
  await pool.end()
}

const addPhotos = async (review_id, url) => {
  //console.log(review_id, url)
  await pool.query(`
  INSERT INTO photos (review_id, url) VALUES (${review_id}, '${url}')
  `).then((res)=> {
    //console.log('THIS IS RES', res);
  })
  .catch((err) => {
    console.log(err)
  });
  await pool.end;
}

const addCharacteristic = async ( char_id, review_id, value) => {
  await pool.query(`
  INSERT INTO characteristics (characteristic_id, review_id, value) 
  VALUES (${char_id},${review_id},${value})
  `).then((res) => {

  }).catch(err => console.log(err));
}

//getPhotos()
module.exports = {
  addPhotos, 
  addCharacteristic,
  pool
  };