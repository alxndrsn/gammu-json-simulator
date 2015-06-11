var assert = require('chai').assert,
    sinon = require('sinon'),
    fs = require('fs'),
    _ = require('lodash'),
    MessageStore = require('../lib/message-store.js').MessageStore;

describe('message store', function() {
  var stubs = {},
      messageStore;

  beforeEach(function() {
    messageStore = new MessageStore();
    stubs.readdir = sinon.stub(fs, 'readdirSync');
    stubs.unlink = sinon.stub(fs, 'unlinkSync');
    stubs.writeFile = sinon.stub(fs, 'writeFileSync');
  });

  afterEach(function() {
    _.each(stubs, function(it) {
      it.restore();
    });
  });

  describe('#available()', function() {
    it('should check the /terminating directory for available messages', function() {
      // given
      stubs.readdir.withArgs('./runtime/terminating/').returns(['1', '4', '6']);

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
      assert.ok(stubs.unlink.calledWith('./runtime/terminating/3'));
    });

    it('should unlink multiple requested files', function() {
      // when
      messageStore.delete('3', '6');

      // then
      assert.equal(stubs.unlink.callCount, 2);
      assert.ok(stubs.unlink.calledWith('./runtime/terminating/3'));
      assert.ok(stubs.unlink.calledWith('./runtime/terminating/6'));
    });

    it('should unlink all available if "all" supplied as arg', function() {
      // given
      stubs.readdir.returns(['1', '2', '3']);

      // when
      messageStore.delete('all');

      // then
      assert.equal(stubs.unlink.callCount, 3);
      assert.ok(stubs.unlink.calledWith('./runtime/terminating/1'));
      assert.ok(stubs.unlink.calledWith('./runtime/terminating/2'));
      assert.ok(stubs.unlink.calledWith('./runtime/terminating/3'));
    });
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
      assert.equal(stubs.writeFile.callCount, 1);
      assert.ok(stubs.writeFile.calledWith(
          './runtime/originating/1', JSON.stringify(messageData)));
    });
  });
});
