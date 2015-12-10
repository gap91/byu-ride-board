var React = require("react");
var ReactRouter = require("react-router");
var api = require("./api.js");


/*TO-DO
MODAL SUCCESS AND RE-ROUTE...
          OR
FADE THE ALERT OUT AFTER 2 SECONDS
*/
// List entry component, handles adding new items to the list
var Create = React.createClass({

  getInitialState: function() {
    return {
      // there was an error on logging in
      error: false
    };

  },

  //handles submit event for creating a new trip
  handleSubmit: function (event) {
  event.preventDefault();
  document.getElementById('heading').scrollIntoView();

  var leaveDate = new Date(this.refs.leaving.value);
  var returnDate = new Date(this.refs.returning.value);

  if (returnDate < leaveDate){
    this.setState({
      type: 'danger',
      message: 'Return date must be after leave date.'
    });
    return;
  }

  this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData(event));
  },

  // handles submission of form data
  sendFormData: function(event) {
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
            for (var ref in _this.refs) {
              _this.refs[ref].value = ''; 
            }
            console.log(res);
            _this.setState({ type: 'success', message: 'We have created your trip. Check it out in your dashboard!' });
      }
      else {
            console.log("no success");
            _this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
      }
    });
  },

  // render the trip entry area
  render: function() {
    var date = new Date();

    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">
                 {this.state.message}
               </div>;
    }

    var currentTime = new Date()
    var month1 = currentTime.getMonth() + 1
    var day1 = currentTime.getDate()
    var year1 = currentTime.getFullYear()
    if (month1<10) month1="0"+month1; 
    if (day1<10) day1="0"+day1; 
    curdate = year1 + "-" + month1 + "-" + day1

    return (
      <div className="createForm" id="a">
        <h1 id="heading">Please enter the information about your trip below</h1>
          {status}
        <form action="" id="create-trip-form" name="tripForm" autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="create-question">What is your destination?</div>
          <input type="text" id="new-item" ref="destination" placeholder="Provo UT" autoFocus={true} required /><br/><br/>
          <div className="create-question">When are you leaving?</div>
          <input type="date" id="new-item" ref="leaving" min={curdate} required /><br/><br/>
          <div className="create-question">When are you returning?</div>
          <input type="date" id="new-item" ref="returning" min={curdate} required /><br/><br/>
          <div className="create-question">Please leave your contact information. (i.e. email, phone, etc.)</div>
          <input type="text" id="new-item" ref="contact" placeholder="Contact Information" required /><br/><br/>
          <div className="create-question">For any other details (cost, payment, etc...)</div>
          <input type="text" id="new-item" ref="description" placeholder="Description" required /><br/><br/>
          <div className="create-question">How many open seats will you have?</div>
          <input type="number" id="new-item" ref="seats" placeholder="# of seats" min="0" required /><br/><br/> 
          <input className="btn btn-primary" type="submit" value="Create" />
          <a className="statement">Please be reminded that all trips leave from, and return to, Provo, UT.</a><br/><br/>
          {this.state.error ? (
             <div className="alert alert-danger">Sorry, there has been an error. Please try again later.</div>
           ) : null }
        </form>
      </div>
    );
  }
});

module.exports = Create;