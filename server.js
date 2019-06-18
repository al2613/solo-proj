const express = require('express');

const app = express();
const port = 3000;
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const request = require('request');
const eventCtrl = require('./controllers/event-controller');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(`${__dirname}/`));
app.use(cors());

app.get('/rated', eventCtrl.getEvent);
// build out needed routes
// using proxy to manage cors warnings and grab data from places API
app.get('/developer/:search/:lat/:long', (req, res) => {
  const { search, lat, long } = req.params;
  request(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=AIzaSyC0cSTnym-r836gkhPRgER9MWycFRtDMrI&location=${lat},${long}&radius=30`,
    (err, response, result) => {
      if (err) return res.status(500).json('internal error');
      else return res.status(200).json(result);
    }
  );
});

app.get('/restaurant/:id', (req, res) => {
  request(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
      req.params.id
    }&key=AIzaSyC0cSTnym-r836gkhPRgER9MWycFRtDMrI`,
    (err, response, result) => {
      if (err) return res.status(500).json('internal error');
      else return res.status(200).json(result);
    }
  );
});

app.get('/sentiment/:id', (req, res) => {
  request(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
      req.params.id
    }&key=AIzaSyC0cSTnym-r836gkhPRgER9MWycFRtDMrI`,
    (err, response, result) => {
      if (err) return res.status(500).json('internal error');

      let sentimentResults = [];

      let converted = JSON.parse(result);
      const { reviews } = converted.result;
      reviews.forEach(review =>
        sentimentResults.push(sentiment.analyze(review.text))
      );
      return res.status(200).json(sentimentResults);
    }
  );
});

app.post('/rated', eventCtrl.postEvent);

app.listen(port, () => console.log(`listening on port ${port}...`));
