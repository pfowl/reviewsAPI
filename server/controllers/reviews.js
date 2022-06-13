const { Reviews }= require('../../db/Reviews.js');


const getReviews = async (productId = 2, sort, count) => {
  //console.log('👻', productId, sort, count)
  return await Reviews.query(`
    SELECT json_build_object(
      'review_id', review.id,
      'rating', review.rating,
      'summary', review.summary,
      'recommend', review.recommend,
      'response', review.response,
      'body', review.body,
      'date', review.date,
      'helpfulness', review.helpfulness,
      'photos', (
          SELECT coalesce(json_agg(json_build_object(
              'id', photos.id,
              'url', photos.url
          )), '[]') FROM photos WHERE review_id = review.id
      )
    ) AS result
    FROM review
    WHERE product_id = ${productId}
    `)
}

module.exports = {

  reviewBuilder: async (productId, sort, count = 5, page = 1) => {
    return getReviews(productId, sort, count)
    .then((data) => {
      let overall = {};
      overall.product = productId;
      overall.page = page;
      overall.count = count;
      if(data.rows.length )
      overall.results = data.rows;
      return overall;
    });
  },

}