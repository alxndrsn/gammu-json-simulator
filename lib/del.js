var log = require('./log'),
    _ = require('lodash'),
    messageStore = require('./message-store'),

    generateResponse = function(requestedVal, ids) {
      var response = {
        result: 'success',
        detail: {},
        totals: {
          requested: requestedVal,
          attempted: 0, deleted: 0, errors: 0, examined: 0, skipped: 0
        }
      };

      _.each(messageStore.available(), function(id) {
        var deleted;

        if(_.contains(ids, id)) {
          try {
            messageStore.delete(id);
            deleted = true;
          } catch(e) {
            console.log('Caught while unlinking: ' + e);
          }
        }

        ++response.totals.examined;
        response.detail[id] = deleted ? 'ok' : 'skip';
        if(deleted) {
          ++response.totals.attempted;
          ++response.totals.deleted;
        } else {
          ++response.totals.skipped;
        }
      });

      return response;
    };

module.exports = function() {
  'use strict';

  if(arguments[0] === 'all') {
    return generateResponse('all', messageStore.available());
  } else {
    return generateResponse(arguments.length, arguments);
  }
};
