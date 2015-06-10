var assert = require('chai').assert;

describe('del', function() {
  var del = require('../lib/del');

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
});
