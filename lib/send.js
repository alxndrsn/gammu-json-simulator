var log = require('./log'),
    _ = require('lodash'),
    messageStore = require('./message-store'),
    GsmTools = require('./gsm-tools'),

    sentMessageCount = 0;

module.exports = function(args) {
  'use strict';
  var i, sent = [], parts;

  if(arguments.length % 2 !== 0) {
      throw new Error('Illegal arguments - must be pairs of <to> <message>');
  }

  for(i=0; i<arguments.length; i+=2) {
    var to = arguments[0],
        content = arguments[i+1];

    ++sentMessageCount;
    parts = _.map(GsmTools.split(content), function(text, i) {
      var ref = messageStore.saveSent(to, content);
      return { content:text, index:i+1, reference:ref, result:'success', status:0 };
    });
    sent.push({
        index:sentMessageCount,
        parts:parts,
        parts_sent:parts.length,
        parts_total:parts.length,
        result:'success'
    });
  }

  return sent;
};

module.exports.resetCounter = function() {
  sentMessageCount = 0;
};
