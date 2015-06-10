var log = require('./log'),
    _ = require('lodash'),

    available = _.map(_.range(1, 11), function(i) {
      return i.toString(); }),

    generateResponse = function(requestedVal, ids) {
      var response = {
        result: 'success',
        detail: {},
        totals: {
          requested: requestedVal,
          attempted: 0, deleted: 0, errors: 0, examined: 0, skipped: 0
        }
      };

      _.each(available, function(id) {
        var deleted = _.contains(ids, id);
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

module.exports = function(args) {
  'use strict';
  log('del() :: args = ' + JSON.stringify(args));

  if(args[0] === 'all') {
    return generateResponse('all', available);
  } else {
    return generateResponse(args.length, args);
  }
};
