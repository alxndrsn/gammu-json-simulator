var assert = require('chai').assert,
    sinon = require('sinon'),
    fs = require('fs'),
    _ = require('lodash'),
    messageStore = require('../lib/message-store.js');

describe('message store', function() {
  var stubs = {};

  beforeEach(function() {
    stubs.readdir = sinon.stub(fs, 'readdirSync');
    stubs.unlink = sinon.stub(fs, 'unlinkSync');
  });

  afterEach(function() {
    _.each(stubs, function(it) {
      it.restore();
    });
  });

  describe('#available()', function() {
    it('should check the /received directory for available messages', function() {
      // given
      stubs.readdir.yield('1', '4', '6');

      // when
      var available = messageStore.available();

      // then
      assert.deepEquals(available, ['1', '4', '6']);
    });
  });

  describe('#delete()', function() {
    it('should unlink the requested file', function() {
      // when
      messageStore.delete('3');

      // then
      assert.equal(stubs.unlink.called, 1);
      assert.ok(stub.unlink.calledWith('./runtime/received/1'));
  });

  describe('#send()', function() {
    it('should save the message to a file', function() {
      // given
      var messageData = {
          "index": 1,
          "reference": 254,
          "status": 0,
          "content": "This is a test message. الحروف عربية. ان شاء الله.",
          "result": "success"
      };

      // when
      messageStore.saveSent(messageData);

      // then
      assert.equal(stubs.writeFile.callCount, 1));
      assert.ok(stubs.writeFile.calledWith(
          './runtime/sent/1', JSON.stringify(messageData)));
    });
  });
});
