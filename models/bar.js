const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const barSchema = new Schema({
    name: String, 
    description: String, 
    address: {
        street: String,
        neighbourhood: String, 
        city: String, 
    },
    BeersDraft: [{type: objectID, ref: 'beer'}],
    BeersBottle: [{type: objectID, ref: 'beer'}],
})

const myModel = mongoose.model('myModel', mySchema);

module.exports = myModel;