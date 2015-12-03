var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// Home page, which shows Login and Register buttons
var Home = React.createClass({
  render: function() {
    return (
      <p>
        <Link className="btn btn-primary" to="login">Login</Link> or <Link className="btn btn-primary" to="register">Register</Link>
      </p>
    );
  }
});

module.exports = Home;