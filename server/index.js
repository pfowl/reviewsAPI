require('newrelic');
require('dotenv').config(); 
const path = require('path')
const express = require('express');
const app = express();
const { reviewBuilder  } = require('./controllers/reviews');
const { metaBuilder  } = require('./controllers/meta');
const { addAll } = require('./controllers/add');

app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send({"This is an API" : "What DID YOUR EXPECT SOMETHING FANCY!"})
});

app.get('/reviews/:id', (req, res) => {
  reviewBuilder(req.params.id, req.query.toString, req.query.count)
  .then((data) => {
    res.status(200).send(data);
  }).catch(err => console.error(err));
});

app.get(`/reviews/:id/meta`, (req, res) => {
  metaBuilder(req.params.id)
  .then((data) => {
    res.status(200).send(data)
  }).catch(err => console.error(err));
});

app.post('/reviews/:id', (req, res) => {
  addAll(req.params.id, req.body);
  res.status(201).send('Got it!');
});

//loader io setup
app.get('/loaderio-d371e994971c8a41bc1a24de8c116d7a/', (req, res) => {
  res.sendFile('/Users/mstrsplinter/Documents/hackreactor/sdc/public/loaderio-d371e994971c8a41bc1a24de8c116d7a.txt')
});

console.log('Listening on PORT: ', process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT);