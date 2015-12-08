var React = require("react");

var api = require("./api.js");

// Trip shown on dashboard
var Item = React.createClass({
    // Initial state
    getInitialState: function () {
        return {
            destination: this.props.trip.destination,
            leaving: this.props.trip.leaving,
            returning: this.props.trip.returning,
            contact: this.props.trip.contact,
            discription: this.props.trip.discription,
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
                <div className="view">
                    <label>{this.props.trip.destination}</label>
                </div>
            </li>
        );
    }
});
