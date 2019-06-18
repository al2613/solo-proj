const Restaurant = require('../models/database.js');
const mongoose = require('mongoose');

const dbURL =
  'mongodb+srv://al2613:1234@cluster0-xmnk0.mongodb.net/codesmith?retryWrites=true';
mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then(() => console.log('database connected'))
  .catch(err => console.log(err));

function getEvent(req, res) {
  Restaurant.find({}, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('database encountered an error');
    }
    console.log(result);
    return res.status(200).json(result);
  });
}

function postEvent(req, res) {
  console.log(req.body);
  const { name, rating, user_experience } = req.body;
  Restaurant.create({ name, rating, user_experience }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('database encountered an error');
    }
    console.log(result);
    return res.status(200).json(result);
  });
}

module.exports = { getEvent, postEvent };
