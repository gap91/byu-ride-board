var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// Home page, which shows Login and Register buttons
var Home = React.createClass({
  render: function() {
    return (
      <div className="homepage_wrapper">
	      <p className="orbetweenbuttons">
	        <Link className="btn btn-primary" to="login">Login</Link> or <Link className="btn btn-primary" to="register">Register</Link>
	      </p>
	      <br />
	      <p>The BYU Ride Board is a simple elegant application for round trip excursions leaving from and returning to the Provo Area.</p>
	      <br />
	      <p>Search our vast database of trips and find the a ride to wherever you need to go.</p>
	      <br />
	      <p>Or Create your own trip and allow others to contact you for a ride.</p>
	      <br />
	      <p>See our <a target="_blank" className="homepage_link" href="https://github.com/gap91/byu-ride-board/wiki">wiki</a> page for a full rundown on our project.</p>
	      <p>DISCLAIMER: The CS 360 group who created this web application is not responsible for any actions/communication/payments made via the contact information posted in this site.</p>
	      <br />
	      <br />
	      <p>Creators:</p>
	      <p className="creator">Garrett Porter</p>
	      <p className="creator">Dave Bennett</p>
	      <p className="creator">Jordan Millard</p>
	      <br />
      </div>
    );
  }
});

module.exports = Home;
