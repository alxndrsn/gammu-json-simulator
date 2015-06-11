var assert = require('chai').assert,
    sinon = require('sinon'),
    fs = require('fs'),
    _ = require('lodash'),
    messageStore = require('../lib/message-store.js');

describe('message store', function() {
  var availableFiles, stubs;

  beforeEach(function() {
    availableFiles = {};
    stubs = {};
    stubs.readdir = sinon.stub(fs, 'readdirSync');
    stubs.unlink = sinon.stub(fs, 'unlinkSync');
    stubs.writeFile = sinon.stub(fs, 'writeFileSync');
    stubs.readfile = sinon.stub(fs, 'readFileSync', function(path, options) {
      var FILE_WHITELIST = new RegExp('^\./\.gammu-json-simulator/terminating/.*'),
          file;
      if(!(options && options.encoding === 'UTF-8')) {
        throw new Error('Must request UTF-8 encoding of path!');
      }
      if(!FILE_WHITELIST.test(path)) {
        throw new Error('Should only open paths in ./.gammu-json-simulator/terminating/ dir' +
            '\n\tAttempted to open: ' + path);
      }
      // strip directories from provided path
      file = path.substring('./.gammu-json-simulator/terminating/'.length);
      return availableFiles[file];
    });

    messageStore.resetReferenceNumbers();
  });

  afterEach(function() {
    _.each(stubs, function(it) {
      it.restore();
    });
  });

  describe('#available()', function() {
    it('should check the /terminating directory for available messages', function() {
      // given
      stubs.readdir.withArgs('./.gammu-json-simulator/terminating/').returns(['1', '4', '6']);

      // when
      var available = messageStore.available();

      // then
      assert.deepEqual(available, ['1', '4', '6']);
    });
  });

  describe('#delete()', function() {
    it('should unlink the requested file', function() {
      // when
      messageStore.delete('3');

      // then
      assert.equal(stubs.unlink.callCount, 1);
      assert.ok(stubs.unlink.calledWith('./.gammu-json-simulator/terminating/3'));
    });

    it('should unlink multiple requested files', function() {
      // when
      messageStore.delete('3', '6');

      // then
      assert.equal(stubs.unlink.callCount, 2);
      assert.ok(stubs.unlink.calledWith('./.gammu-json-simulator/terminating/3'));
      assert.ok(stubs.unlink.calledWith('./.gammu-json-simulator/terminating/6'));
    });

    it('should unlink all available if "all" supplied as arg', function() {
      // given
      stubs.readdir.returns(['1', '2', '3']);

      // when
      messageStore.delete('all');

      // then
      assert.equal(stubs.unlink.callCount, 3);
      assert.ok(stubs.unlink.calledWith('./.gammu-json-simulator/terminating/1'));
      assert.ok(stubs.unlink.calledWith('./.gammu-json-simulator/terminating/2'));
      assert.ok(stubs.unlink.calledWith('./.gammu-json-simulator/terminating/3'));
    });
  });

  describe('#retrieve()', function() {
    it('should return empty list if no MT messages are available', function() {
      // given
      stubs.readdir.returns([]);

      // when
      var result = messageStore.retrieve();

      // then
      assert.deepEqual(result, []);
    });

    it('should return single item list if 1 message available', function() {
      // given
      stubs.readdir.returns(['1']);
      availableFiles = { 1:'"hello"' };

      // when
      var result = messageStore.retrieve();

      // then
      assert.deepEqual(result, ['hello']);
    });

    it('should return all items if multiple messages available', function() {
      // given
      stubs.readdir.returns(['1', '2']);
      availableFiles = {
        1: '"hello"',
        2: '{ "has_val":true }'
      };

      // when
      var result = messageStore.retrieve();

      // then
      assert.deepEqual(result, ['hello', { has_val:true }]);
    });
  });

  describe('#send()', function() {
    it('should save the message to a file', function() {
      // given
      var to = '+123456789',
          content =  'This is a test message.';

      // when
      var response = messageStore.saveSent(to, content);

      // then
      assert.equal(stubs.writeFile.callCount, 1);
      assert.ok(stubs.writeFile.calledWith(
          './.gammu-json-simulator/originating/1',
          JSON.stringify({ to: '+123456789', text: 'This is a test message.' })
      ));
      assert.equal(response, '1');
    });

    it('should respond with incrementing reference numbers', function() {
      // when
      var response1 = messageStore.saveSent('1', 'hi'),
          response2 = messageStore.saveSent('2', 'bye');

      // then
      assert.equal(response1, '1');
      assert.equal(response2, '2');

      // andt
      assert.deepEqual(stubs.writeFile.args, [
          [ './.gammu-json-simulator/originating/1', JSON.stringify({ to:'1', text:'hi' }) ],
          [ './.gammu-json-simulator/originating/2', JSON.stringify({ to:'2', text:'bye' }) ]
        ]
      );
    });
  });
});
