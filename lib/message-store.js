'use strict';

var fs = require('fs'),
    _ = require('lodash'),

    lastOriginatingMessageId = 0,
    STORE_BASE_DIR = './runtime',
    deleteMessageFile = function(id) {
      fs.unlinkSync(STORE_BASE_DIR + '/terminating/' + id);
    },

    store = {
      available: function() {
        return fs.readdirSync(STORE_BASE_DIR + '/terminating/');
      },

      delete: function() {
        var ids;
        if(!arguments.length) return;

        if(arguments[0] === 'all') {
          ids = store.available();
        } else {
          ids = arguments;
        }

        _.each(ids, function(id) {
          deleteMessageFile(id);
        });
      },

      saveSent: function(message) {
        var id = ++lastOriginatingMessageId;
        fs.writeFileSync(STORE_BASE_DIR + '/originating/' + id,
            JSON.stringify(message));
      }
    };

module.exports = store;
