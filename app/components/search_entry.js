var React = require("react");
var ReactRouter = require("react-router");

var api = require("./api.js");
var ListTrips = require("./list_trips.js");

var GoogleMapsLoader = require('google-maps');
var SearchDestination = "";
var SearchRadius = 50;
var Matches = [];

// Written by Jordan Millard


// Search entry component, handles searching for close destinations
var SearchEntry = React.createClass({

  // initial state
  getInitialState: function() {
    return {
      // empty list for search results
      items: [],
    };
  },

  // handles submit event for searching destinations
  submitSearch: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get values from form
    SearchDestination = this.refs.searchtext.value;
    SearchRadius = this.refs.radius.value;

    // console.log("This is the searched place: " + searchtext);
    // console.log("This is the given search radius: " + searchradius);

    if (!SearchDestination | !SearchRadius) { // Unreachable
      return;
    }
    // call API to get all trips (necesary because the logic and google calls forced to be front end)
    api.getAllTrips(this.parseResults);
    this.refs.searchtext.value = '';
  },

  parseResults: function(status, data){
    if (status) {
      // Clear the list of results when the seach is first submitted
      this.setState({
        items: []
      });

      if (SearchDestination == "all"){
        // For testing enter code word "all" to see all destinations
        this.setState({
          items: data.trips
        });
        return;
      }

      Matches = [];
      var allTrips = data.trips;
      var _this = this;

      allTrips.forEach(function(trip){
        //ask google if trip.destination distance from given destination
        GoogleMapsLoader.load(function(google) {
          var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix( {
            origins: [trip.destination],
            destinations: [SearchDestination],
            travelMode: google.maps.TravelMode["DRIVING"]
          }, cb);
          function cb(response,status) {
            if(status == google.maps.DistanceMatrixStatus.OK) {
              var distance = response.rows[0].elements[0].distance.value;
              //var duration = response.rows[0].duration.text;  // Not using
              if(distance <= (1600 * SearchRadius)) {
                Matches.push(trip);
                      Matches.forEach(function(match) {
                        _this.setState({
                          items: Matches
                        });
                      });
              }
            }
          }
        });
      });
    } else {
      // if the API call fails, redirect to the login page
      this.context.router.transitionTo('/login');
    }
  },

// TODOJMM No trips found message


  // render the Search Page
  render: function() {
    return (
      <div className="createForm" id="a">
        <h1 id="heading">Search for final destination from Provo, UT</h1>
        {status}
        <form action="" id="create-trip-form" name="tripForm" autoComplete="off" onSubmit={this.submitSearch}>
          <div className="create-question">Enter a destination</div>
          <input type="text" id="new-item" ref="searchtext" placeholder="Mesa AZ" autoFocus={true} required /><br/><br/>
          <div className="create-question">Enter a mile radius</div>
          <input type="number" id="new-item" ref="radius" defaultValue="50" min="5" max="1000" required/><br/><br/>
          <input className="btn btn-primary" type="submit" value="Search" /><br/><br/>
          <a className="statement">Please be reminded that all trips leave from, and return to, Provo, UT.</a>
          <br/>
          {this.state.error ? (
             <div className="alert alert-danger">Sorry an error has occured.</div>
           ) : null }
        </form>
        <ListTrips items={this.state.items} />
      </div>
    );

  }
});

module.exports = SearchEntry;