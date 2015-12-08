var React = require("react");
var ReactRouter = require("react-router");

var api = require("./api.js");

var Link = ReactRouter.Link;

// Search entry component, handles adding new items to the list
var SearchEntry = React.createClass({

  // initial state
  getInitialState: function() {
    return {
      // list of items in the todo list
      items: [],
    };
  },

  // handles submit event for searching destinations
  submitSearch: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get search destination from form
    var title = this.refs.title.value;
    if (!title) {
      return;
    }
    // call API to search destinations, and reload once added
    api.searchTrips(title, this.updateResults); // TODOJMM cb was originally just refresh
    this.refs.title.value = '';
  },

  reload: function() {
    // TODOJMM
  },

  updateResults: function(status, data){
    if (status) {
      // set the state for the list of items
      this.setState({
        items: data.items //TODOJMM I think this will eventually be data.trips
      });
      this.props.reload // TODOJMM Don't know if this works, maybe just this.reload
    } else {
      // if the API call fails, redirect to the login page
      this.context.router.transitionTo('/login');
    }
  },

  // render the item entry area
  render: function() {
    return (
      <header id="input">
        <form id="item-form" name="itemForm" onSubmit={this.submitSearch}>
          <input type="text" id="new-item" ref="title" placeholder="Enter a Destination" autoFocus={true} />
        </form>
      </header>
    );

  }
});

module.exports = SearchEntry;