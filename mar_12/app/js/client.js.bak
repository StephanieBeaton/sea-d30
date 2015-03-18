
var React = require('react');
var ajax  = require('jquery').ajax;

var platypusData1 = [{platypusName: 'hello world', _id: 1}, {platypusName: 'goodbye world', _id: 2}];

var Platypus = React.createClass({
  render: function () {
    return <li>{this.props.data.platypusName}</li>
  }
});

var PlatypusList = React.createClass({
  render: function () {
    var platypuses = this.props.data.map(function(platypus) {
      return <Platypus data={platypus} key={platypus._id}/>
    });

    return (
      <section>
        <h1>Platypus:</h1>
        <ul>
          {platypuses}
       </ul>
      </section>
    )
  }
});

var PlatypusForm = React.createClass({
  getInitialState: function() {
    return {newPlatypus: {platypusName: ''}};
  },
  handleChange: function(event){
    this.setState({newPlatypus: {platypusName: event.target.value}});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.newPlatypus);
    var newPlatypus = this.state.newPlatypus;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(newPlatypus),
      success: function(data) {
        this.props.onNewPlatypusSubmit(data);
        this.setState({newPlatypus: {noteName: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{this.state.newPlatypus.platypusName}</h3>
        <label htmlFor="newPlatypus">New Platypus: </label>
        <input id="newPlatypus" type="text" value={this.state.newPlatypus.platypusName} onChange={this.handleChange}/>
        <button type="submit"> Create New Platypus</button>
      </form>
    )
  }

});

var PlatypusApp = React.createClass({
  getInitialState: function() {
    return {platypusData: []};
  },
  onNewPlatypus: function(platypus) {
    platypus._id = this.state.platypusData.length + 1;
    var stateCopy = this.state;
    stateCopy.platypusData.push(platypus);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url: this.props.platypusBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.platypusData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
        console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <PlatypusForm onNewPlatypusSubmit={this.onNewPlatypus} url={this.props.platypusBaseUrl}/>
        <PlatypusList data={this.state.platypusData} />
      </main>
    )
  }
});

React.render(<PlatypusApp platypusBaseUrl={'/api/v1/platypus'}/>, document.body);
