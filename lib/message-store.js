'use strict';

var fs = require('fs'),
    _ = require('lodash'),

    lastMessageReference = 0,
    STORE_BASE_DIR = './runtime',
    deleteMessageFile = function(id) {
      fs.unlinkSync(STORE_BASE_DIR + '/terminating/' + id);
    },

    store = {
      resetReferenceNumbers: function() {
        lastMessageReference = 0;
      },

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

      saveSent: function(to, text) {
        var reference = ++lastMessageReference,
            message = { to:to, text:text };
        fs.writeFileSync(STORE_BASE_DIR + '/originating/' + reference,
            JSON.stringify(message));
        return reference.toString();
      }
    };

module.exports = store;
