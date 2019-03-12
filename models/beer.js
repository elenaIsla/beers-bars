const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const beerSchema = new Schema({
  name: String, 
  description: String, 
  beerlogoImage: String,
})

const myModel = mongoose.model('Beers', beerSchema);

module.exports = myModel;