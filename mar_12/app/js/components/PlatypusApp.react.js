'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
// var request = require('superagent');
var PlatypusStore = require('../stores/PlatypusStore');
var stores = require('../stores/Stores');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

// Method to retrieve state from Stores
function getZooState() {
  return  PlatypusStore.getState();
}



var PlatypusForm = React.createClass({
  mixins: [FluxMixin],

  // Get initial state from stores
  getInitialState: function() {
    //return {newPlatypus: {platypusName: '', platypusAge: ''}};
    return {newPlatypus: {platypusName: '', platypusAge: ''}}
  },

  handleChange: function(event) {
    event.preventDefault();

    var stateCopy = this.state;
    if (event.target.name === 'new-platypus-name')
      stateCopy.newPlatypus.platypusName = event.target.value;
    if (event.target.name === 'new-platypus-age')
      stateCopy.newPlatypus.platypusAge = event.target.value;

    this.setState(stateCopy);
  },

  handleSubmit: function(event) {
    event.preventDefault();

    this.getFlux().actions.addPlatypus(this.state.newPlatypus);

    this.setState({newPlatypus: {platypusName: '', platypusAge: ''}});
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-platypus-name">Name: </label>
        <input id="new-platypus-name" type="text" value={this.state.newPlatypus.platypusName} onChange={this.handleChange} name="new-platypus-name"/>
        <label htmlFor="new-platypus-age">Age: </label>
        <input id="new-platypus-age" type="text" value={this.state.newPlatypus.platypusAge} onChange={this.handleChange} name="new-platypus-age" />
        <button type="submit">Create New Platypus</button>
      </form>
    )
  },

});

var Platypus = React.createClass({
  mixins: [FluxMixin],
  handleDelete: function() {
    this.getFlux().actions.deletePlatypus(this.props.data);
  },
  render: function() {
    return <li><span>{this.props.data.platypusName + ': '}</span>{this.props.data.platypusAge}<button onClick={this.handleDelete}>Delete</button></li>
  }
});

var PlatypusList = React.createClass({
  render: function() {
    var platypuses = this.props.data.map(function(platypus) {
      return <Platypus data={platypus} key={platypus._id}/>;
    });
    return (
      <section>
        <h1>Platypuses:</h1>
        <ul>
          {platypuses}
        </ul>
      </section>
    )
  }
});

var PlatypusApp = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('PlatypusStore')],

  getStateFromFlux: function() {
    console.log("inside getStateFromFlux");
    console.log("getFlux()");
    //console.log(this.getFlux());
    //return this.getFlux().store('PlatypusStore').getState();
    return getZooState();
  },

  render: function() {
    console.log("platypusApp render");
    return (
      <main>
        <PlatypusForm />
        <PlatypusList data={this.state.platypuses} />
      </main>
    )
  }
});

React.render(<PlatypusApp flux={flux}/>, document.body);
