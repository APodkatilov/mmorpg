import f from '../server/core/game';
var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('game', function() {
    describe('test', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal(f(1), 2);
      });
    });
  });
  