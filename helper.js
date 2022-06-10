const { getReviews, getPhotos }= require('./db.js');

module.exports = {

  reviewBuilder: async () => {

    return getReviews().then((review) => {
      return getPhotos().then((photo) => {
        for (let rev of review.rows) {
          //console.log(rev.id);
          let current = rev.id
          let pics = []
          for (let pic of photo.rows) {
            console.log(pic.review_id, '   ', rev.id)
            if (pic.review_id === rev.id) {
              console.log('REV', pic.id)
              pics.push(photo.rows[pic.id-1]);
              review.rows[rev.id - 1].photos = pics;
            }
          }
        }
        
        //console.log(review)
        return review.rows;
      })
      
    })

  },

}