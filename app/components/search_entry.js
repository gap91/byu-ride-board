var React = require("react");
var ReactRouter = require("react-router");

var api = require("./api.js");
var ListTrips = require("./list_trips.js");

var Link = ReactRouter.Link;
var GoogleMapsLoader = require('google-maps');

// Search entry component, handles searching for close destinations
var SearchEntry = React.createClass({

  // initial state
  getInitialState: function() {
    return {
      // list of search results
      items: [],
    };
  },

  // handles submit event for searching destinations
  submitSearch: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get search destination from form
    var title = this.refs.title.value;
    if (!title) {
      return;
    }
    // call API to get all trips (necesary because the logic and google calls forced to be front end)
    api.getAllTrips(this.updateResults); // TODOJMM cb was originally just refresh
    this.refs.title.value = '';
  },

  reload: function() {
    // TODOJMM
  },

  updateResults: function(status, data){
    if (status) {

      var searchDestination = "Mesa, Arizona"; // TODOJMM Get the search string

      var matches = [];
      var allTrips = data.trips;

        allTrips.forEach(function(trip){
          //ask google if trip.destination is within 50 miles of the given destination
          GoogleMapsLoader.load(function(google) {
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix( {
              origins: [trip.destination],
              destinations: [searchDestination],
              travelMode: google.maps.TravelMode["DRIVING"]
            }, cb);
            function cb(response,status) {
              if(status == google.maps.DistanceMatrixStatus.OK) {
                var distance = response.rows[0].elements[0].distance.value;
                //var duration = response.rows[0].duration.text;
                if(distance<80000) {
                  matches.push(trip);
                }
              }
            }
          });
        });

      this.setState({
        items: matches
      });
      this.props.reload // TODOJMM Don't know if this works, maybe just this.reload
    } else {
      // if the API call fails, redirect to the login page
      this.context.router.transitionTo('/login');
    }
  },

  // render the item entry area
  render: function() {
    return (
      <div>
        <header id="input">
          <form id="item-form" name="itemForm" onSubmit={this.submitSearch}>
            <input type="text" id="new-item" ref="title" placeholder="Enter a Destination" autoFocus={true} />
          </form>
        </header>
        <ListTrips items={this.state.items} reload={this.reload}/>
      </div>
    );

  }
});

module.exports = SearchEntry;

