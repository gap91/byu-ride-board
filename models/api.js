var app = require('./express.js');
var User = require('./user.js');
var Trip = require('./trip.js');

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//
// API
//

// register a user
app.post('/api/users/register', function (req, res) {
  // find or create the user with the given username
  User.findOrCreate({username: req.body.username}, function(err, user, created) {
    if (created) {
      // if this username is not taken, then create a user record
      user.name = req.body.name;
      user.set_password(req.body.password);
      user.save(function(err) {
	if (err) {
	  res.sendStatus("403");
	  return;
	}
        // create a token
	var token = User.generateToken(user.username);
        // return value is JSON containing the user's name and token
        res.json({name: user.name, token: token});
      });
    } else {
      // return an error if the username is taken
      res.sendStatus("403");
    }
  });
});

// login a user
app.post('/api/users/login', function (req, res) {
  // find the user with the given username
  User.findOne({username: req.body.username}, function(err,user) {
    if (err) {
      res.sendStatus(403);
      return;
    }
    // validate the user exists and the password is correct
    if (user && user.checkPassword(req.body.password)) {
      // create a token
      var token = User.generateToken(user.username);
      // return value is JSON containing user's name and token
      res.json({name: user.name, token: token});
    } else {
      res.sendStatus(403);
    }
  });
});

// get all trips for the user
app.get('/api/trips', function (req,res) {
  // validate the supplied token
  var trips = [];
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, find all the user's trips and return them
      trips = Trips.find(
        { "results.user": user.id}, function(err, trips) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
	// return value is the list of trips as JSON
	res.json({trips:trips});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// add a trip
app.post('/api/trips', function (req,res) {
  // validate the supplied token
  // get indexes
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, create the trip for the user
      Trip.create({destination:req.body.trip.destination,leaving:req.body.trip.leaving,returning:req.body.trip.returning,
        contact:req.body.trip.contact,description:req.body.trip.description,seats:req.body.trip.seats,users:[user.id]}, function(err,trip) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
	res.json({trip:trip});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// get all trip destinations
app.get('/api/trips/all', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      Trip.find({}, function(err, trips){
        if (err) {
            res.sendStatus(403);
            return;
        }
        res.json({trips:trips});
      });

    } else {
      res.sendStatus(403);
    }
  });
});

// add user to a trip
app.put('/api/trips/:trip_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested trip
      Trip.findById(req.params.trip_id, function(err,trip) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
        // update the trip
        trip.collection('users').insert(user.id);
        trip.save(function(err) {
	  if (err) {
	    res.sendStatus(403);
	    return;
	  }
          // return value is the trip as JSON
          res.json({trip:trip});
        });
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// delete one user from a trip
app.delete('/api/trips/:trip_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested trip and remove the user from it
      Trip.findById(req.params.trip_id,function(err,trip){if(err){res.sendStatus(403);return;}}).collection('users').findByIdAndRemove(user.id, function(err,trip) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

