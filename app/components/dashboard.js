var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// Dashboard page, which shows Login and Register buttons
var Dashboard = React.createClass({
  render: function() {
    return (
      <div className="newDiv" id="a">
      Say
      hello
      to 
      your
      Dashboard.
      You
      will
      now
      have
      the
      chance
      to
      accomplish
      something.
      </div>
    );
  }
});

module.exports = Dashboard;