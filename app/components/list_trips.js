var React = require("react");
var ReactRouter = require("react-router");

var Trip = require("./trip.js");

// List trips component, shows a list of trips for search results

// TODO Create an almost copy of this for list of trips for dashboard (maybe)

var ListTrips = React.createClass({
  // context so the component can access the router
  contextTypes: {
    location: React.PropTypes.object
  },
  // render the list of trips
  render: function() {
    // using the list of items, generate a Trip element for each one
    var list = this.props.items.map(function(trip) {
      return (
        <Trip key={trip.id} trip={trip} reload={this.props.reload}/>
      );
    }.bind(this));

    // render the list // TODO Maybe refactor his css tags
    return (
      <ul id="trip-list">
	       {list}
      </ul>
    );
  }
});

module.exports = ListTrips;
