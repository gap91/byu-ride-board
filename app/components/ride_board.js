var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var auth = require("./auth.js");

// Top-level component for the app
var New = React.createClass({
  // mixin for navigation
  mixins: [ History ],

  // initial state
  getInitialState: function() {
    return {
      // the user is logged in
      loggedIn: auth.loggedIn()
    };
  },

  // callback when user is logged in
  setStateOnAuth: function(loggedIn) {
    this.setState({loggedIn:loggedIn});
  },

  // when the component loads, setup the callback
  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth;
  },

  // logout the user and redirect to home page
  logout: function(event) {
    auth.logout();
    this.history.pushState(null, '/');
  },

  // show the navigation bar
  // the route handler replaces the RouteHandler element with the current page
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
            <div className="nav navbar-nav navbar-right">
              {this.state.loggedIn ? (
                 <ul className="nav navbar-nav">
                   <li className="nav-element"><a href="#/dashboard">Dashboard</a></li>
                   <li className="nav-element"><a href="#/create">Create</a></li>
                   <li className="nav-element"><a href="#/search">Search</a></li>
                   <li className="nav-element"><a href="#" onClick={this.logout}>Logout</a></li>
                 </ul>
               ) : (<div></div>)}
            </div>
            </div>
          </div>
        </nav>
	<div className="container">
	  {this.props.children}
	</div>
      </div>
    );

  }
});

module.exports = New;