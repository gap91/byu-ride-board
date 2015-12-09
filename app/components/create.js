var React = require("react");
var ReactRouter = require("react-router");
var api = require("./api.js");

// List entry component, handles adding new items to the list
var Create = React.createClass({

  getInitialState: function() {
    return {
      // there was an error on logging in
      error: false
    };

  },

  handleSubmit: function (event) {
  event.preventDefault();
  document.getElementById('heading').scrollIntoView();
  this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  },
  // handles submit event for adding a new item
  sedFormData: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var destination = this.refs.destination.value;
    var leaving = this.refs.leaving.value;
    var returning = this.refs.returning.value;
    var contact = this.refs.contact.value;
    var description = this.refs.description.value;
    var seats = this.refs.seats.value;
    // call API to add trip
    var _this = this;
    api.addTrip(destination,leaving,returning,contact,description,seats, function(success, res) {
      if (success) {
        _this.setState({ type: 'success', message: 'We have received your message and will get in touch shortly. Thanks!' });
      }
      else {
        _this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
      }
    });
  },

  // render the trip entry area
  render: function() {
    if (this.state.type && this.state.message) {
              var classString = 'alert alert-info' + this.state.type;
              var status = <div id="status" className={classString} ref="status">
                             {this.state.message}
                           </div>;
    }
    return (
      <div className="newDiv" id="a">
        <h1 id="heading">Please enter the information about your trip below</h1>
        {status}
        <form action="" id="create-trip-form" name="tripForm" autoComplete="off" onSubmit={this.handleSubmit}>
          Where are you headed?<br/>
          <input type="text" id="form-field" ref="destination" placeholder="Destination" autoFocus={true} required /><br/><br/>
          When are you leaving?<br/>
          <input type="date" id="form-field" ref="leaving" autoFocus={true} required /><br/><br/>
          When are you returning?<br/>
          <input type="date" id="form-field" ref="returning" autoFocus={true} required /><br/><br/>
          How would you like to be contacted?<br/>
          <input type="text" id="form-field" ref="contact" placeholder="Contact Information" autoFocus={true} required /><br/><br/>
          For any other details we forgot to ask...<br/>
          <input type="text" id="form-field" ref="description" placeholder="Description" autoFocus={true} required /><br/><br/>
          How many open seats will you have?<br/>
          <input type="number" id="form-field" ref="seats" placeholder="# of seats" min="0" autoFocus={true} required /><br/><br/> 
          <input className="btn btn-primary" type="submit" value="Create" />
          {this.state.error ? (
             <div className="alert alert-danger">Invalid username or password.</div>
           ) : null }
        </form>
      </div>
    );
  }
});

module.exports = Create;