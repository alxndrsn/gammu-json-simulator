# Usage

## Using it instead of real `gammu-json`

Add the `bin/` directory for this project to the head of your `PATH` environment variable to override the real `gammu-json` executable.  E.g.

	PATH=../mock-gammu-json/bin:$PATH node examples/driver-gammu-json.js

## Seeing what's going on

To see the log of conversation between `node-gammu-json` and `gammu-json`:

	tail -F log/calls.log

### Received messages

To simulate a Mobile Terminating message on the device, put it in:

	runtime/received

### Sending messages

To see what Mobile Originating messages have been 'sent' by the device, look in:

	runtime/sent
