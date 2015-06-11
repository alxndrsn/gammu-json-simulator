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
    require('./message-store').init();
    echo(del.apply(this, args));
    break;
  case 'retrieve':
    require('./message-store').init();
    echo(retrieve.apply(this, args));
    break;
  case 'send':
    require('./message-store').init();
    echo(send.apply(this, args));
    break;
  default: usage();
}
