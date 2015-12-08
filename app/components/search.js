var React = require("react");
var ReactRouter = require("react-router");

var Link = ReactRouter.Link;

var api = require("./api.js");
var SearchEntry = require("./searchentry.js");


// Search page, which shows a search bar and listed results
var Search = React.createClass({
  // context so the component can access the router
  // contextTypes: {
  //   location: React.PropTypes.object
  // },
 
  // // initial state
  // getInitialState: function() {
  //   return {
  //     // list of items in the todo list
  //     items: [],
  //   };
  // },

  // // when the component loads, get the list items
  // componentDidMount: function() {
  //   //api.getItems(this.listSet);
  // },

  // // reload the list of items
  // reload: function() {
  //   //api.getItems(this.listSet);
  // },

  // // callback for getting the list of items, sets the list state
  // listSet: function(status, data) {
  //   if (status) {
  //     // set the state for the list of items
  //     this.setState({
  //       items: data.items
  //     });
  //   } else {
  //     // if the API call fails, redirect to the login page
  //     this.context.router.transitionTo('/login');
  //   }
  // },

  // Search page, which shows a search bar and listed results
  render: function() {
    return (
      <div id="newDiv" id="a">
        <section id="main">
          <SearchEntry reload={this.reload} />
        </section>
      </div>
    );
  }
});

module.exports = Search;




// var Search = React.createClass({
//   render: function() {
//     return (
//       <div className="newDiv" id="a">
//         <section id="main">
//           <SearchEntry reload={this.reload}/>
//         </section>
//       </div>
//     );
//   }
// });