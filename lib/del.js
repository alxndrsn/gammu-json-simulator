var log = require('./log'),
    echo = require('./echo');

module.exports = function(args) {
  'use strict';
  log('del() :: args = ' + JSON.stringify(args));

  echo({
     "detail" : {
       "1" : "ok",
       "2" : "ok",
       "3" : "ok",
       "4" : "ok",
       "5" : "ok",
       "6" : "ok",
       "7" : "ok"
       },
     "result" : "success",
     "totals" : {
       "errors" : 0,
       "requested" : "all",
       "deleted" : 7,
       "attempted" : 7,
       "examined" : 7,
       "skipped" : 0
      }
  });
};
