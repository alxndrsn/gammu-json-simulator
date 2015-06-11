'use strict';

var messageStore = require('./message-store');

module.exports = function() {
  return messageStore.retrieve();
};
