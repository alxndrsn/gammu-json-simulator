'use strict';

var GSM7_BIT_PART_LIMIT = 153;

exports.split = function(message) {
  var parts;
  if(message.length < 160) {
    return [message];
  }

  parts = [];
  while(message.length > GSM7_BIT_PART_LIMIT) {
    parts.push(message.substring(0, GSM7_BIT_PART_LIMIT));
    message = message.substring(GSM7_BIT_PART_LIMIT);
  }
  parts.push(message);
  return parts;
};
