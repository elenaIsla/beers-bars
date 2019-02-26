const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const beerSchema = new Schema({
  name: String, 
  description: String, 
  barDraft: {type: ObjectId, ref: 'Bar'},
  barBottle: {type: ObjectId, ref: 'Bar'},

})

const myModel = mongoose.model('myModel', mySchema);

module.exports = myModel;