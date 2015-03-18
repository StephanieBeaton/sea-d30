// stores/PlatypusStore.js
'use strict';

var Fluxxor = require('fluxxor');
var request = require('superagent');
var constants = require('../constants/ZooConstants');
//var actions = require('../actions/ZooActions');

var baseUrl = '/api/v1/platypus';

// required in by View Controller  and Stores
var PlatypusStore = module.exports = Fluxxor.createStore({
  initialize: function() {
    this.platypuses = [];

    this.bindActions(
      constants.ADD_PLATYPUS, this.onNewPlatypus,
      constants.REMOVE_PLATYPUS, this.onRemovePlatypus
    );

    request
      .get(baseUrl)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.platypuses = res.body;
        this.emit('change');
      }.bind(this));
  },

  onNewPlatypus: function(platypus) {
    request
      .post(baseUrl)
      .send(platypus)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.platypuses.push(res.body);
        this.emit('change');
      }.bind(this));
  },

  onRemovePlatypus: function(platypus) {
    request
      .del(baseUrl + '/' + platypus._id)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.platypuses.splice(this.platypuses.indexOf(platypus), 1);
        this.emit('change');
      }.bind(this));
  },

  getState: function() {
    return {platypuses: this.platypuses};
  }
});
