// setup Express
var app = require('./models/express.js');

// setup mongoose
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
/*
var mongoURI = "mongodb://localhost:27017/test";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
  */

// models
var api = require('./models/api.js');
var User = require('./models/user.js');
var Trip = require('./models/trip.js');

// start the server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Started on port",port);
});
