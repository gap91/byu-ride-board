// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var findOrCreate = require('mongoose-findorcreate')

    var User = require('./user.js');

// Trip schema
var tripSchema = new Schema({
    users: [{type: ObjectId, ref: 'users'}], // need to make this a trip
    destination: String,
    leaving: Date,
    returning: Date,
    contact: String,
    discription: String,
    seats: Number,
});

// ensure shemas use virtual IDs
tripSchema.set('toJSON', {
    virtuals: true
});

// add findorCreate
tripSchema.plugin(findOrCreate);

// create trip
var Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;
