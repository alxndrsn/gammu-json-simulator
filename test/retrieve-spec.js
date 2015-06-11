var assert = require('chai').assert,
    sinon = require('sinon'),
    _ = require('lodash'),
    messageStore = require('../lib/message-store');


describe('retrieve', function() {
  var retrieve = require('../lib/retrieve'),
      stubs, messages;

  beforeEach(function() {
    stubs = {};
    messages = [];

    stubs.read = sinon.stub(messageStore, 'retrieve');
  });

  afterEach(function() {
    _.each(stubs, function(stub) { stub.restore(); });
  });

  it('should supply file contents from the terminating dir', function() {
    // when
    retrieve();

    // then
    assert.equal(stubs.read.callCount, 1);
  });
});

