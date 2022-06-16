
const {Reviews}= require('./db/Reviews');

let addReviewTable = () => {
  Reviews.query(`
  CREATE TABLE review(
    id SERIAL PRIMARY KEY,
    product_id integer,
    rating integer,
    date bigint,
    summary VARCHAR(1200),
    body VARCHAR(2000),
    recommend BOOLEAN,
    reported BOOLEAN,
    reviewer_name VARCHAR(150),
    reviewer_email VARCHAR(150),
    response VARCHAR(2000),
    helpfulness integer
  )
  `)
};

let copy = '\\';
let addReviewData = () => {
  Reviews.query(`
    ${copy} review(id, product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness)
    FROM '/Users/mstrsplinter/Documents/hackreactor/sdc/csv/reviews.csv'
    DELIMITER ','
    CSV HEADER;
  `)
}
//addReviewTable();
console.log('COPY 😶‍🌫️', copy)
addReviewData();

let addPhotosTable = () => {
  Reviews.query(`
  CREATE TABLE photos(
    id SERIAL PRIMARY KEY,
    review_id integer,
    url VARCHAR(1200),
    FOREIGN KEY (review_id) REFERENCES review(id)
  )
  `)
}

let addPhotosData = () => {
  Reviews.query(`
    
  `)
}
//run it

let addCharOverviewTable = () => {
  Reviews.query(`
  CREATE TABLE charOverview(
    id SERIAL PRIMARY KEY,
    product_id integer,
    name VARCHAR(100)
  )
  `)
}
let addCharOverviewData = () => {
  Reviews.query(`

  `)
}
//run it

let addCharacteristicsTable = () => {
  Reviews.query(`
  CREATE TABLE characteristics(
    id SERIAL PRIMARY KEY,
    characteristic_id integer,
    review_id integer,
    value integer
  )
  `)
}
let addCharacteristicsData = () => {
  Reviews.query(`
    
  `)
}