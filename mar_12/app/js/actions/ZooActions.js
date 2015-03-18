var Fluxxor = require('fluxxor');
var constants = require('../constants/ZooConstants');

var actions = module.exports =  {

  addPlatypus: function(platypus) {
    this.dispatch(constants.ADD_PLATYPUS, platypus);
  },

  deletePlatypus: function(platypus) {
    this.dispatch(constants.REMOVE_PLATYPUS, platypus);
  }
};
