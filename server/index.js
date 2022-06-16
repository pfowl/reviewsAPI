require('newrelic');
const express = require('express');
const app = express();
const { reviewBuilder  } = require('./controllers/reviews');
const { metaBuilder  } = require('./controllers/meta');
const { addAll } = require('./controllers/add');
require('dotenv').config(); 

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

console.log('Listening on PORT: ', process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT);