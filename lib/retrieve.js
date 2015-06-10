var log = require('./log'),
    echo = require('./echo');

module.exports = function (args) {
  'use strict';
  log('retrieve() :: args = ' + JSON.stringify(args));

  echo ([
     {
        "location" : 1,
        "smsc" : "+12085552222",
        "content" : "This is a test message.",
        "segment" : 1,
        "inbox" : true,
        "smsc_timestamp" : false,
        "folder" : 1,
        "udh" : false,
        "timestamp" : "2013-04-02 17:05:49",
        "from" : "+15035551212",
        "total_segments" : 1,
        "encoding" : "utf-8"
      },
      {
        "location" : 2,
        "smsc" : "+12085552222",
        "content" : "This is another test message.",
        "segment" : 1,
        "inbox" : true,
        "smsc_timestamp" : false,
        "folder" : 1,
        "udh" : false,
        "timestamp" : "2013-04-02 17:06:03",
        "from" : "+15155551111",
        "total_segments" : 1,
        "encoding" : "utf-8"
     }
   ]);
};
