const express = require('express');

const app = express();
const port = 3000;
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const request = require('request');
const eventCtrl = require('./controllers/event-controller');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());

app.get('/developer/:search', (req, res) => {
  request(
    `https://developer.mozilla.org/en-US/search.json?q=${  req.params.search}`,
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(body);
        res.send(JSON.stringify(body));
      }
    },
  );
});

app.get('/notes', eventCtrl.getEvent);

app.post('/notes', eventCtrl.postEvent);

app.delete('/:topic', eventCtrl.deleteEvent);

app.use(express.static(`${__dirname}/`));

app.listen(port, () => console.log(`listening on port ${port}...`));
