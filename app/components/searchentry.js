var React = require("react");

var api = require("./api.js");

// Search entry component, handles adding new items to the list
var SearchEntry = React.createClass({
  // handles submit event for searching destinations
  addItem: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get search destination from form
    var title = this.refs.title.value;
    if (!title) {
      return;
    }
    // call API to search destinations, and reload once added
    api.searchTrips(title, this.props.reload);
    this.refs.title.value = '';
  },

  // render the item entry area
  render: function() {
    return (
      <header id="input">
        <form id="item-form" name="itemForm" onSubmit={this.addItem}>
          <input type="text" id="new-item" ref="title" placeholder="Enter a Destination" autoFocus={true} />
        </form>
      </header>
    );

  }
});

module.exports = SearchEntry;
