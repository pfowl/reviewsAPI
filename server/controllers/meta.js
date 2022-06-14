const { Reviews }= require('../../db/Reviews.js');

let getChars = async (productId) => {
  return  await Reviews.query(`
  SELECT json_object_agg(
      name, json_build_object(
          'id', characteristics.characteristic_id,
          'value', characteristics.value,
          'review_id', characteristics.review_id
      ) 
    )AS Result FROM characteristics INNER JOIN charOverview 
    ON charOverview.product_id = ${productId} AND characteristics.characteristic_id = charOverview.id
  `);
};

let getRating = async (productId) => {
  return await Reviews.query(`
    SELECT rating, count(*)
    FROM review WHERE product_id = ${productId} Group by 1
  `)
}
module.exports = {


  metaBuilder: async (productId) => {
    return getChars(productId).then((res) => {
      let newObj = {};
      return getRating(productId).then(ratings => {
        console.log(ratings.rows);
        let ratingObj = {};
        ratings.rows.forEach(rating => {
          ratingObj[rating.rating] = rating.count
        })
        console.log(ratingObj)
        newObj.product_id = productId;
        newObj.rating = ratingObj;
        newObj.recommended = {1:5};
        newObj.characteristics = res.rows[0].result;
        //console.log(res.rows[0].result);
        //console.log(newObj);
        return newObj;

      });
      return newObj
    });
    
  }
  
  

}