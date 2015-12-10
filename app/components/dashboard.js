var React = require("react");
var ReactRouter = require("react-router");

var api = require("./api.js");
var ListTrips = require("./list_trips.js");

var Link = ReactRouter.Link;
var username="testing";
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function isInArray(array, search)
{
    return array.indexOf(search) >= 0;
}

// Dashboard page
var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      items: [],
    };
  },
  getTrips: function() {
    return api.getAllTrips(this.updateResults);
  },
  updateResults: function(status, data){
    if (status) {
      var matches = [];
      var curTrips = data.trips;
      curTrips.forEach(function(trip){
        if (isInArray(trip.users, localStorage.id)){
          matches.push(trip);
        }
      });
      this.setState({
        items: matches
      });
    }
    else {
        this.context.router.transitionTo('/login');
    }
  },
  render: function() {
    this.getTrips();
    return (
      <div className="dashDisplay" id="a">
        <h1>Welcome Back  {localStorage.name}</h1>
        <h2>Here are all of your trips:</h2>
        <ListTrips items={this.state.items} reload={this.getTrips}/>
      </div>
    );
  }
});

module.exports = Dashboard;
