var log = require('./log'),
    echo = require('./echo');

module.exports = function(args) {
  'use strict';
  log('send() :: args = ' + JSON.stringify(args));

  echo([
     {
      "parts_sent": 2,
      "index": 1,
      "parts_total": 2,
      "parts": [
         {
            "index": 1,
            "reference": 2,
            "status": 0,
            "content": "The portion before this contains only Latin characters. Nepali text",
            "result": "success"
         },
         {
            "index": 2,
            "reference": 3,
            "status": 0,
            "content": " follows this. हो",
            "result": "success"
         }
      ],
      "result": "success"
     }
    ]);
};

