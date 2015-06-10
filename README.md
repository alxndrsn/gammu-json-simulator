# Usage

## Using it instead of real `gammu-json`

Add the `bin/` directory for this project to the head of your `PATH` environment variable to override the real `gammu-json` executable.  E.g.

	PATH=../mock-gammu-json/bin:$PATH node examples/driver-gammu-json.js

## Seeing what's going on

	tail -F log/calls.log
