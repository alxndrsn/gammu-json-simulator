var args = process.argv.slice(2),
    command,
    log = require('./log'),
    retrieve = require('./retrieve'),
    send = require('./send'),
    del = require('./del'),
    usage = require('./usage');

if(!args.length) usage();

command = args[0];
args = args.slice(1);

switch(command) {
  case 'delete':
    del(args);
    break;
  case 'retrieve':
    retrieve(args);
    break;
  case 'send':
    send(args);
    break;
  default: usage();
}
