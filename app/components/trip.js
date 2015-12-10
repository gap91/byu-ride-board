var React = require("react");

var api = require("./api.js");

// Trip shown on dashboard
var Trip = React.createClass({
    // Initial state
    getInitialState: function () {
        return {
            destination: this.props.trip.destination,
            leaving: this.props.trip.leaving,
            returning: this.props.trip.returning,
            contact: this.props.trip.contact,
            description: this.props.trip.description,
            seats: this.props.trip.seats
        }
    },
    // delete myself from this a trip
    delteTrip: function() {
        api.deleteTrip(this.props.trip, this.props.reload);
    },
    // add myself to a trip
    addTrip: function() {
        api.addTrip(this.props.trip, this.props.reload);
    },
    // render the Trip
    render: function() {
    // construct a list of classes for the trip CSS
        var classes = "";
        return (
            <li className={classes}>
                <div className="tripDisplay" id="a">
                    <h2>Destination</h2>
                    <p>{this.props.trip.destination}</p>
                    <h3>Leaving:</h3>
                    <p>{this.props.trip.leaving}</p>
                    <h3>Returning:</h3>
                    <p>{this.props.trip.returning}</p>
                    <h3>Contact:</h3>
                    <p>{this.props.trip.contact}</p>
                    <h3>Description</h3>
                    <p>{this.props.trip.description}</p>
                    <h3>Seats</h3>
                    <p>{this.props.trip.seats}</p>
                </div>
                <br/><br/>
            </li>
        );
    }
});

module.exports = Trip;
