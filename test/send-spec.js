var assert = require('chai').assert,
    sinon = require('sinon'),
    _ = require('lodash'),
    messageStore = require('../lib/message-store');

describe('send', function() {
  var send = require('../lib/send'),
      stubs;

  beforeEach(function() {
    var messageRef = 0;

    stubs = {};
    stubs.save = sinon.stub(messageStore, 'saveSent', function() {
      return ++messageRef;
    });

    messageStore.resetReferenceNumbers();
    send.resetCounter();
  });

  afterEach(function() {
    _.each(stubs, function(stub) { stub.restore(); });
  });

  it('should send a simple message', function() {
    // given
    // when
    var response = send('+15035551212', 'This is a simple test message.');

    // then
    assert.equal(stubs.save.callCount, 1);
    assert.deepEqual(stubs.save.args[0], [
        '+15035551212',
        'This is a simple test message.' ]);
    assert.deepEqual(response, [
        {
          "parts_sent": 1,
          "index": 1,
          "parts_total": 1,
          "parts": [
           {
            "index": 1,
            "reference": 1,
            "status": 0,
            "content": "This is a simple test message.",
            "result": "success"
           }
          ],
          "result": "success"
        }
      ]);
  });

  it('should send a long message', function() {
    // given
    // when
    var response = send('+15035551212', 'This is a simple test message. This is only a test. Had this been an actual message, the authorities in your area (with cooperation from federal and state authorities) would have already read it for you.');

    // then
    assert.equal(stubs.save.callCount, 2);
    assert.ok(stubs.save.args[0], {
        to: '+15035551212',
        content: 'This is a simple test message. This is only a test. Had this been an actual message, the authorities in your area (with cooperation from federal and state authorities) would have already read it for you.'
    });
    assert.deepEqual(response, [
      {
        "parts_sent": 2,
        "index": 1,
        "parts_total": 2,
        "parts": [
         {
          "index": 1,
          "reference": 1,
          "status": 0,
          "content": "This is a simple test message. This is only a test. Had this been an actual message, the authorities in your area (with cooperation from federal and stat",
          "result": "success"
         },
         {
          "index": 2,
          "reference": 2,
          "status": 0,
          "content": "e authorities) would have already read it for you.",
          "result": "success"
         }
        ],
        "result": "success"
      }
    ]);
  });

  it('should send UCS2 message', function() {
    // given
    // when
    var response = send('+15035551212', 'This is a test message. الحروف عربية. ان شاء الله.');

    // then
    assert.equal(stubs.save.callCount, 1);
    assert.ok(stubs.save.args[0], [
        '+15035551212',
        'This is a test message. الحروف عربية. ان شاء الله.' ]);
    assert.deepEqual(response, [
      {
        "parts_sent": 1,
        "index": 1,
        "parts_total": 1,
        "parts": [
           {
              "index": 1,
              "reference": 1,
              "status": 0,
              "content": "This is a test message. الحروف عربية. ان شاء الله.",
              "result": "success"
           }
        ],
        "result": "success"
      }
    ]);
  });

  it('should send multiple messages', function() {
    // given
    // when
    var response = send(
        '+15035551212', 'This is a simple test message.',
        '+15035551213', 'This is another simple test message.');

    // then
    assert.equal(stubs.save.callCount, 2);
    assert.ok(stubs.save.args, [{
        to: '+15035551212',
        content: 'This is a simple test message.'
      },
      {
        to: '+15035551213',
        content: 'This is another simple test message.'
      }]);
    assert.deepEqual(response, {});
  });
});
