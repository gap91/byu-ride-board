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
    deleteTrip: function() {
        api.deleteTrip(this.props.trip, this.props.reload);
    },
    // add myself to a trip
    addTrip: function() {
        api.updateTrip(this.props.trip, this.addTripCallback);
    },

    addTripCallback: function(added, res) {
        if (res == "OK"){
            alert("Trip added to your dashboard!");
        } else {
            alert("Error: your trip was not added!");
        }
        // console.log(res);
    },

    // render the Trip
    render: function() {
    // construct a list of classes for the trip CSS
        var classes = "";
        return (
            <div className={classes}>
                <div className="tripDisplay" id="a">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="destination">
                                    <strong>
                                    <h2>Destination</h2>
                                    </strong>
                                    <p>{this.props.trip.destination}</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="tableElement">
                                    <strong>Leaving:</strong>
                                    <p>{this.state.leaving}</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="tableElement">
                                    <strong>Returning:</strong>
                                    <p>{this.state.returning}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="tableElement">
                                    <strong>Seats:</strong>
                                    <p>{this.props.trip.seats}</p>
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <div className="tableElement">
                                    <strong>Contact:</strong>
                                    <p>{this.props.trip.contact}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="description">
                                    <strong>Description</strong>
                                    <p>{this.props.trip.description}</p>
                                </div>
                            </div>
                        </div> 
                        <div className="col-sm-2">
                            <div className="btn add-trip-btn" onClick={this.addTrip}>
                                <strong>Add to my dashboard</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
});

module.exports = Trip;