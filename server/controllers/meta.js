const { Reviews }= require('../../db/Reviews.js');

let getChars = async (productId) => {
  return  await Reviews.query(`
  SELECT json_object_agg(
      name, json_build_object(
          'id', characteristics.characteristic_id,
          'value', characteristics.value
      ) 
    )AS Result FROM characteristics INNER JOIN charOverview 
    ON charOverview.product_id = ${productId} AND characteristics.characteristic_id = charOverview.id
  `);

  /* replace above with below and deal with it
    SELECT 
      json_build_object(
      name, (SELECT json_agg(json_build_object(
        'id', id,
         'value', value
      )) from characteristics where charOverview.id = characteristics.characteristic_id)
    )AS Result FROM charOverview Where charOverview.product_id = 1 
  
  */
};

let getRating = async (productId) => {
  return await Reviews.query(`
    SELECT rating, count(*)
    FROM review WHERE product_id = ${productId} Group by 1
  `)
}

  let getRecommened = async (productId) => {
    return await Reviews.query(`
      SELECT recommend, count(*)
      FROM review WHERE product_id = ${productId} Group by 1
  `)
  }

module.exports = {

  metaBuilder: async (productId) => {
    return getChars(productId).then((res) => {
      let newObj = {};
      return getRating(productId).then(ratings => {
        return getRecommened(productId).then(rec => {
          let recommend = 0;
          rec.rows.forEach(recommendation => {
            if (recommendation.recommend) {
              recommend = recommendation.count;
            }
          })
          let ratingObj = {};
          ratings.rows.forEach(rating => {
            ratingObj[rating.rating] = rating.count
          })
          newObj.product_id = productId;
          newObj.rating = recommend;
          newObj.recommended = {1:5};
          newObj.characteristics = res.rows[0].result;
          //console.log(res.rows[0].result);
          //console.log(newObj);
          return newObj;
        });
        return newObj
      });
      return newObj
    });
    
  }
  
  

}