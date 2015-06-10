var args = process.argv.slice(2),
    command,
    log = require('./log'),
    retrieve = require('./retrieve'),
    send = require('./send'),
    del = require('./del'),
    echo = require('./echo'),
    usage = require('./usage');

if(!args.length) usage();

command = args[0];
args = args.slice(1);

switch(command) {
  case 'delete':
    echo(del(args));
    break;
  case 'retrieve':
    echo(retrieve(args));
    break;
  case 'send':
    echo(send(args));
    break;
  default: usage();
}
