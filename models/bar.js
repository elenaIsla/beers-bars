const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const barSchema = new Schema({
    barType: String,
    name: {type: String, required: true, unique: true}, 
    description: String,
    address: {
        street: String,
        neighbourhood: String, 
        city: String, 
    }, 
    category: String,
    BeersDraft: [{type: ObjectId, ref: 'Beer'}],
    BeersBottle: [{type: ObjectId, ref: 'Beer'}],
    creator: {type: ObjectId, ref: 'User'},
})

const myBar = mongoose.model('Barmodel', barSchema);

module.exports = myBar;