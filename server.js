const express = require('express');
const app = express();
const { getPhotos }= require('./db.js');
const { reviewBuilder } = require('./helper.js');
require('dotenv').config(); 



app.get('/', (req, res) => {
  res.send({"This is an API":"What DID YOUR EXPECT SOMETHING FANCY!"})
});

app.get('/reviews', (req, res) => {
  let reviews = reviewBuilder();
  reviews.then((data) => {
    //console.log('💆🏼‍♂️🤭 == 😱', data)
    res.status(200).send(data);
  });

});


console.log('Listening on PORT: ', process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT);