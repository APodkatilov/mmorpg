/* eslint-disable no-console */
import { equal } from 'assert';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      const t = new Map();
      console.log(t);
      equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// describe('game', function() {
//     describe('test', function() {
//       it('should return -1 when the value is not present', function() {
//         equal(f(1), 2);
//       });
//     });
//   });
