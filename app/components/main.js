var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var New = require("./new.js");
var Home = require("./home.js");
var Login = require("./login.js");
var Register = require("./register.js");
var Dashboard = require("./dashboard.js");
var Create = require("./create.js");
var Search = require("./search.js");

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../css/app.css");

var routes = (
  <Router>
    <Route name="new" path="/" component ={New}>
      <IndexRoute component = {Home} />
      <Route name ="dashboard" path="/dashboard" component={Dashboard} />
      <Route name ="create" path="/create" component={Create} />
      <Route name ="search" path="/search" component={Search} />
      <Route name ="register" path="/register" component={Register} />
      <Route name ="login" path="/login" component={Login} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
