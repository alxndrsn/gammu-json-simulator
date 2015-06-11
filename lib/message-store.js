var fs = require('fs'),
    _ = require('lodash');

exports.MessageStore = function() {
  'use strict';

  var lastOriginatingMessageId = 0,
  STORE_BASE_DIR = './runtime',
  deleteMessageFile = function(id) {
    fs.unlinkSync(STORE_BASE_DIR + '/terminating/' + id);
  };

  this.available = function() {
    return fs.readdirSync(STORE_BASE_DIR + '/terminating/');
  };

  this.delete = function() {
    var ids;
    if(!arguments.length) return;

    if(arguments[0] === 'all') {
      ids = this.available();
    } else {
      ids = arguments;
    }

    _.each(ids, function(id) {
      deleteMessageFile(id);
    });
  };

  this.saveSent = function(message) {
    fs.writeFileSync(STORE_BASE_DIR + '/originating/' + ++lastOriginatingMessageId,
        JSON.stringify(message));
  };
};
