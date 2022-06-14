const express = require('express');
const app = express();
const { reviewBuilder  } = require('./controllers/reviews');
const { metaBuilder  } = require('./controllers/meta');
require('dotenv').config(); 

app.get('/', (req, res) => {
  res.send({"This is an API" : "What DID YOUR EXPECT SOMETHING FANCY!"})
});

app.get('/reviews/:id', (req, res) => {
  reviewBuilder(req.params.id, req.query.toString, req.query.count)
  .then((data) => {
    res.status(200).send(data);
  });
});

app.get(`/reviews/:id/meta`, (req, res) => {
  console.log('Params ', req.params);
  metaBuilder(req.params.id)
  .then((data) => {
    //console.log("DATA AMAA ", data)
    res.status(200).send(data)
  })
});

console.log('Listening on PORT: ', process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT);