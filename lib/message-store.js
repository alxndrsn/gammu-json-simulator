'use strict';

var fs = require('fs'),
    _ = require('lodash'),

    lastMessageReference = 0,
    STORE_BASE_DIR = './runtime',
    MT_DIR = STORE_BASE_DIR + '/terminating/',
    deleteMessageFile = function(id) {
      fs.unlinkSync(MT_DIR + id);
    },

    store = {
      resetReferenceNumbers: function() {
        lastMessageReference = 0;
      },

      available: function() {
        return fs.readdirSync(MT_DIR);
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

      retrieve: function() {
        return _.map(store.available(), function(file) {
            var path = MT_DIR + file,
                options = { encoding:'UTF-8' };
            return JSON.parse(fs.readFileSync(path, options));
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
