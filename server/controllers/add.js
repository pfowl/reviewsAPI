const { Reviews }= require('../../db/Reviews.js');


let addReview = async (productId, reviewObj) => {
  return await Reviews.query(`
    INSERT INTO reviewapractice (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness)
    VALUES (${productId}, ${reviewObj.rating}, ${reviewObj.date}, '${reviewObj.summary}', '${reviewObj.body}', ${reviewObj.recommend},'${reviewObj.name}','${reviewObj.email}',${null},${0})  RETURNING id
  `)

  //(${productId}, ${reviewObj.rating},${reviewObj.date},"${reviewObj.body}",${reviewObj.recommend},${reviewObj.name},${reviewObj.email},${null},${0})
  //( product_id, rating, date(i have to get date/timestamp), body, recommend, reviewer_name, reviewer_email, response, helpfulness) 
}

let addPhoto = async (reviewId, photo) => {
  return await Reviews.query(`
    INSERT INTO photos (review_id, url) VALUES (${reviewId}, '${photo}') RETURNING id
  `)
}

let addCharacteristics = async (reviewId, char_id, value) => {
  return await Reviews.query(`
    INSERT INTO characteristics (review_id, characteristic_id, value) VALUES (${reviewId}, ${char_id}, ${value})
  `)
}

//['http//:something','somethingelse']
let addAll = async (productId, reviewObj) => {
  await addReview(productId, reviewObj).then(reviewId => {
    if (reviewObj.photos.length) {
      for ( let pic of reviewObj.photos) {
        addPhoto(reviewId.rows[0].id, pic);
      }
    }

    //charOverview
    for (let char of Object.keys(reviewObj.characteristics)) {
      addCharacteristics(reviewId.rows[0].id, char ,reviewObj.characteristics[char])
      .then(charId => {
        //make sure this is working in client
        //console.log(charId.rows)
      });
    }
  });
}

module.exports= {
  addAll
}
