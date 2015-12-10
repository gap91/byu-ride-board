var React = require("react");

var api = require("./api.js");

// Trip shown on dashboard
var Trip = React.createClass({
    // Initial state
    getInitialState: function () {
        var leavingDate = new Date(this.props.trip.leaving);
        var returningDate = new Date(this.props.trip.returning);

        // Calculate the MST time zone offsett
        var leavingOffset = new Date(leavingDate.getTime() + leavingDate.getTimezoneOffset()*60000);
        var returningOffset = new Date(returningDate.getTime() + returningDate.getTimezoneOffset()*60000);
        
        return {
            destination: this.props.trip.destination,
            leaving: leavingOffset.toDateString(),
            returning: returningOffset.toDateString(),
            contact: this.props.trip.contact,
            description: this.props.trip.description,
            seats: this.props.trip.seats,
            users: this.props.trip.users
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
            <div className={classes}>
                <div className="tripDisplay" id="a">
                    <table className="tripTable" border-bottom="1px solid #ddd" cellSpacing="1" cellPadding="1">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="destination">
                                        <strong>
                                        <h2>Destination</h2>
                                        </strong>
                                        <p>{this.props.trip.destination}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="tableElement">
                                        <strong>Leaving:</strong>
                                        <p>{this.state.leaving}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="tableElement">
                                        <strong>Returning:</strong>
                                        <p>{this.state.returning}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="tableElement">
                                        <strong>Seats:</strong>
                                        <p>{this.props.trip.seats}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="tableElement">
                                        <strong>Contact:</strong>
                                        <p>{this.props.trip.contact}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="tableElement">
                                        <strong>Description</strong>
                                        <p>{this.props.trip.description}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/><br/>
            </div>
        );
    }
});

module.exports = Trip;
