const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 
  neighbourhood: {type: String},
  beerType: {type: String}, 
  // favouriteBeers: {type: objectID, ref: 'Beer'}, 
  // createdBars: {type: objectID, ref: 'Bar'}

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
