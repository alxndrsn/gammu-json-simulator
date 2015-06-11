[gammu-json][1] simulator
====================

A simulated mobile device for use when a real SMS modem is not available.  This utility is a drop-in replacement for [`gammu-json`][1].

# Usage

## Using it instead of real [`gammu-json`][1]

Add the `bin/` directory for this project to the head of your `PATH` environment variable to override the real [`gammu-json`][1] executable.  E.g. when testing [medic-transport][3]:

	PATH=../mock-gammu-json/bin:$PATH node examples/driver-gammu-json.js

## Seeing what's going on

To see the log of conversation between [`node-gammu-json`][2] and [`gammu-json`][1]:

	tail -F log/calls.log

### Received messages

To simulate a Mobile Terminating message on the device, put it in:

	.gammu-json-simulator/received

The file should be JSON matching the spec for [gammu-json][1], e.g.:

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
	}

N.B. these files *may be deleted* by the simulator.

### Sending messages

To see what Mobile Originating messages have been 'sent' by the device, look in:

	.gammu-json-simulator/sent

[1]: https://github.com/medic/gammu-json
[2]: https://github.com/medic/node-gammu-json
[3]: https://github.com/medic/node-gammu-json
