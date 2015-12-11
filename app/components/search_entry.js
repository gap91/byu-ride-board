var React = require("react");
var ReactRouter = require("react-router");

var api = require("./api.js");
var ListTrips = require("./list_trips.js");

var GoogleMapsLoader = require('google-maps');
var SearchDestination = "";
var SearchRadius = 50;
var SpecifyBeforeDate = false;
var LeaveBefore = null;
var Matches = [];

// Written by Jordan Millard


// Search entry component, handles searching for close destinations
var SearchEntry = React.createClass({

  // initial state
  getInitialState: function() {
    return {
      // empty list for search results
      items: [],
      display: false
    };
  },

  // handles submit event for searching destinations
  submitSearch: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get values from form
    SearchDestination = this.refs.searchtext.value;
    SearchRadius = this.refs.radius.value;

    // if (this.refs.leav)
    if (this.refs.leaveBefore.value){
      SpecifyBeforeDate = true;
      LeaveBefore = new Date(this.refs.leaveBefore.value);
    } else { // Set option to false
      SpecifyBeforeDate = false;
      LeaveBefore = null;   
    }

    if (!SearchDestination | !SearchRadius) {
      return;
    }
    // call API to get all trips (necesary because the logic and google calls forced to be front end)
    api.getAllTrips(this.parseResults);
    // this.refs.searchtext.value = ''; // Maybe I don't like clearing the field every time
    this.setState({
      display: false,
      message: '',
      button: true
    });
  },

  clearMessages: function(){
    this.setState({
      type: null,
      message: null,
      display: false
    });
  },

  parseResults: function(status, data){
    if (status) {
      // Clear the list of results when the seach is first submitted
      this.setState({
        items: [],
        display: true
      });

      if (SearchDestination == "all"){
        // For testing enter code word "all" to see all destinations
        this.setState({
          items: data.trips,
          type: "info",
          message: "You have entered the code \"all\" which displays all trips in the DB"
        });
        return;
      }

      Matches = [];
      var allTrips = data.trips;
      var _this = this;

      allTrips.forEach(function(trip){

        var today = new Date();
        var returnDate = new Date(trip.returning);
        var leavingDate = new Date(trip.leaving);

        if (today > returnDate){
          // Don't display trips that already ended
          return;
        }

        if (SpecifyBeforeDate){
          // User specified a leave before date
          if (LeaveBefore < leavingDate){
            // If the leave before date is before the leaving date, don't use that trip
            return;
          }
        }

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
                          items: Matches,
                          type: 'success',
                          message: 'Found destinations within ' + SearchRadius + ' miles of ' + SearchDestination,
                          display: true
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
    var classString = '';
    var status = '';
    if (typeof image_array !== 'undefined' && image_array.length > 0) {
      // There are resultes //console.log("matches present");
    } else if (this.state.display) {
      classString = 'alert alert-info';
      status = <div id="status" className={classString} ref="status">
                     <a onClick={this.clearMessages} className="close" data-dismiss="alert" aria-label="close">✖</a>
                     Connecting with Google to calculate distances... (no matches if this takes too long #asyncronousprobs)
                   </div>;

    }

    if (this.state.type && this.state.message) {
      classString = 'alert alert-' + this.state.type;
      status = <div id="status" className={classString} ref="status">
                     <a onClick={this.clearMessages} className="close" data-dismiss="alert" aria-label="close">✖</a>
                     {this.state.message}
                   </div>;
    }

    return (
      <div className="searchForm" id="a">
        <h1 id="heading">Search for final destination from Provo, UT</h1>
        <form action="" id="create-trip-form" name="tripForm" autoComplete="off" onSubmit={this.submitSearch}>
          <div className="create-question">Enter a destination</div>
          <input type="text" id="new-item" ref="searchtext" placeholder="City or Address" autoFocus={true} required /><br/><br/>
          <div className="create-question">Enter a mile radius</div>
          <input type="number" id="new-item" ref="radius" defaultValue="50" min="5" max="1000" required/><br/><br/>
          <div className="create-question">Leave by this date (optional)</div>
          <input type="date" id="new-item" ref="leaveBefore" /><br/><br/>
          <input className="btn btn-primary" type="submit" value="Search" /><br/><br/>
          <a className="statement">Please be reminded that all trips leave from, and return to, Provo, UT.</a>
          <br/>
          {status}
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
