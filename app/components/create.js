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
  // handles submit event for adding a new item
  addTrip: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var destination = this.refs.destination.value;
    var leaving = this.refs.leaving.value;
    var returning = this.refs.returning.value;
    var contact = this.refs.contact.value;
    var description = this.refs.description.value;
    var seats = this.refs.seats.value;
    // call API to add item, and reload once added
    api.addTrip(destination,leaving,returning,contact,description,seats, function(success) {
      if(!success)
        return this.setState({
          error: true
        });
      for (var ref in this.refs) {
         this.refs[ref].value = '';
      }
      //this.props.reload;
      });
  },

  // render the trip entry area
  render: function() {
    return (
      <header id="input">
        <form id="create-trip-form" name="tripForm" onSubmit={this.addTrip}>
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
      </header>
    );
  }
});

module.exports = Create;