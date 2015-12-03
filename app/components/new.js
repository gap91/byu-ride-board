var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// New page, which shows Login and Register buttons
var New = React.createClass({
  render: function() {
    return (
      <div className = "newDiv" id="a">
      	Hello World!
      </div>
    );
  }
});

module.exports = New;