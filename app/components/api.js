var $ = require("jquery");

// API object
var api = {
  // get the user's list of trips, call the callback when complete
  getTrips: function(cb) {
    var url = "/api/trips";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },
  // add a trip, call the callback when complete
  addTrip: function(destination,returning,leaving,contact,description,seats,cb) {
    var url = "/api/trips";
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        trip: {
          'destination': destination,
          'returning': returning,
          'leaving': leaving,
          'contact': contact,
          'description': description,
          'seats': seats
        }
      }),
      type: 'POST',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });

  },
  // update a trip, call the callback when complete
  updateTrip: function(trip, cb) {
    var url = "/api/trips/" + trip.id;
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        trip: {
          'trip_id': trip.id //not actually being used, just have to send data because it is a put
        }
      }),
      type: 'PUT',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is any error, remove any login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },
  // search for all trips within 50 miles
  searchTrips: function(search,cb) {
    var url = "/api/trips/" + search;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },
  // delete a user from a trip, call the callback when complete
  deleteItem: function(trip, cb) {
    var url = "/api/trips/" + trip.id;
    $.ajax({
      url: url,
      type: 'DELETE',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove any login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  }

};

module.exports = api;
