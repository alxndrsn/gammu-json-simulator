var assert = require('chai').assert,
    sinon = require('sinon'),
    _ = require('lodash'),
    messageStore = require('../lib/message-store');

describe('del', function() {
  var del = require('../lib/del'),
      stubs;

  beforeEach(function() {
    stubs = {};
    stubs.del = sinon.stub(messageStore, 'delete');
    stubs.available = sinon.stub(messageStore, 'available')
        .returns(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });

  afterEach(function() {
    _.each(stubs, function(stub) { stub.restore(); });
  });

  it('should respond with success for selective del', function() {
    // when
    var response = del(['1', '2', '3']);

    // then
    assert.deepEqual(response, {
      result: 'success',
      detail: {
          '1':'ok', '2':'ok', '3':'ok',
          '4':'skip', '5':'skip', '6':'skip', '7':'skip',
          '8':'skip', '9':'skip', '10':'skip' },
      totals: { requested:3, attempted:3, deleted:3,
          errors:0, examined:10, skipped:7 }
    });
  });

  it('should delete corresponding message files for selective del', function() {
    // when
    var response = del(['1', '2', '3']);

    // then
    assert.equal(stubs.del.callCount, 3);
  });

  it('should respond with success to `all`', function() {
    // when
    var response = del(['all']);

    // then
    assert.deepEqual(response, {
      result: 'success',
      detail: {
          '1':'ok', '2':'ok', '3':'ok', '4':'ok', '5':'ok',
          '6':'ok', '7':'ok', '8':'ok', '9':'ok', '10':'ok' },
      totals: { requested:'all', attempted:10, deleted:10,
          errors:0, examined:10, skipped:0 }
    });
  });

  it('should delete corresponding message files for del all', function() {
    // when
    var response = del(['all']);

    // then
    assert.equal(stubs.del.callCount, 10);
  });
});
