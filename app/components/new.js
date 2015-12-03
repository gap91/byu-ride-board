var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

// New page, which shows Login and Register buttons
var New = React.createClass({
  render: function() {
    return (
	    <div>
		    <nav className="navbar navbar-default" role="navigation">
		    <div className="container">
		        <div className="navbar-header">
		          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				  <span className="sr-only">Toggle navigation</span>
				  <span className="icon-bar"></span>
				  <span className="icon-bar"></span>
				  <span className="icon-bar"></span>
		          </button>
		          <a className="navbar-brand" href="/">BYU Ride-Board</a>
		        </div>
		        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		          {this.state.loggedIn ? (
		             <ul className="nav navbar-nav">
		               <li><a href="#/list">All</a></li>
		               <li><a href="#/list/active">Active</a></li>
		               <li><a href="#/list/completed">Completed</a></li>
		               <li><a href="#" onClick={this.logout}>Logout</a></li>
		             </ul>
		           ) : (<div></div>)}
		        </div>
		    </div>
		    </nav>
		    <div className = "newDiv" id="a">
	      	Hello World!
	      	</div>
		</div>
    );
  }
});

module.exports = New;