'use strict';

var messageStore = require('./message-store');

module.exports = function (args) {
  return messageStore.retrieve();
};
