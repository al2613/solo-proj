const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myURI =
  'mongodb+srv://al2613:1234@cluster0-xmnk0.mongodb.net/codesmith?retryWrites=true';

const URI = process.env.MONGO_URI || myURI;

// define schema
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  user_experience: { type: String, required: true }
});

let Message = mongoose.model('Restaurant', restaurantSchema);

module.exports = Message; // <-- export your mode
