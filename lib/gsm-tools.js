'use strict';

var GSM7_BIT_PART_LIMIT = 153,
    // from https://stackoverflow.com/questions/29541753/regex-only-checks-first-character-in-string-c-sharp/29541980#29541977 (with modifications)
    gsm7bitMatcher = /^[@£$¥èéùìòÇØøÅå_ÆæßÉ!"#%&'()*+,.\/0123456789:;<=>? \n¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà^{}\[~\]|€-]*$/,
    split7bit = function(message) {
      var parts;
      if(message.length <= 160) {
        return [message];
      }

      parts = [];
      while(message.length > GSM7_BIT_PART_LIMIT) {
        parts.push(message.substring(0, GSM7_BIT_PART_LIMIT));
        message = message.substring(GSM7_BIT_PART_LIMIT);
      }
      parts.push(message);
      return parts;
    },
    splitUcs2 = function(message) {
      if(message.length <= 70) {
        return [message];
      }
      throw new Error('Don\'t know how to split UCS2 yet!');
    };

exports.split = function(message) {
  if(gsm7bitMatcher.test(message)) {
    return split7bit(message);
  }
  return splitUcs2(message);
};
