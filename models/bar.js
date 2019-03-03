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
    BeersDraft: [{type: ObjectId, ref: 'Beer'}],
    BeersBottle: [{type: ObjectId, ref: 'Beer'}],
    
})

const myBar = mongoose.model('Barmodel', barSchema);

module.exports = myBar;