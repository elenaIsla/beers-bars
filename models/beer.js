const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const beerSchema = new Schema({
  name: String, 
  description: String, 
  foto: String,
})

const myModel = mongoose.model('Beers', beerSchema);

module.exports = myModel;