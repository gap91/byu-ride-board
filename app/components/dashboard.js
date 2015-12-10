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

// Dashboard page
var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      items: [],
    };
  },
  getTrips: function() {
    return api.getTrips(this.updateResults);
  },
  updateResults: function(status, data){
    if (status) {
      this.setState({
        items: data.trips
      });
    }
  },
  render: function() {
    this.getTrips();
    return (
      <div className="tripDisplay" id="a">
        <h1>Welcome Back  {getCookie("username")}</h1>
        <h2>Here are all of your trips:</h2>
        <ListTrips items={this.state.items} reload={this.getTrips}/>
      </div>
    );
  }
});

module.exports = Dashboard;
