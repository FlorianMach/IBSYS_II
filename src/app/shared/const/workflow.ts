import { WorkPlace } from '../model/workplace';

export const workFlowMap = {
  // pattern: 4
  // p1
  1: [new WorkPlace(4, 6, 30)],
  2: [new WorkPlace(4, 7, 20)],
  3: [new WorkPlace(4, 7, 30)],
  // pattern: 10 - 11
  // e4
  4: [new WorkPlace(10, 4, 20), new WorkPlace(11, 3, 10)],
  5: [new WorkPlace(10, 4, 20), new WorkPlace(11, 3, 10)],
  6: [new WorkPlace(10, 4, 20), new WorkPlace(11, 3, 20)],
  7: [new WorkPlace(10, 4, 20), new WorkPlace(11, 3, 20)],
  8: [new WorkPlace(10, 4, 20), new WorkPlace(11, 3, 20)],
  9: [new WorkPlace(10, 4, 20), new WorkPlace(11, 3, 20)],
  // pattern: 13 - 12, 8, 7, 9
  // e10
  10: [
    new WorkPlace(13, 2, 0),
    new WorkPlace(12, 3, 0),
    new WorkPlace(8, 1, 15),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 3, 15),
  ],
  11: [
    new WorkPlace(13, 2, 0),
    new WorkPlace(12, 3, 0),
    new WorkPlace(8, 2, 15),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 3, 15),
  ],
  12: [
    new WorkPlace(13, 2, 0),
    new WorkPlace(12, 3, 0),
    new WorkPlace(8, 2, 15),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 3, 15),
  ],
  13: [
    new WorkPlace(13, 2, 0),
    new WorkPlace(12, 3, 0),
    new WorkPlace(8, 2, 15),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 3, 15),
  ],
  14: [
    new WorkPlace(13, 2, 0),
    new WorkPlace(12, 3, 0),
    new WorkPlace(8, 2, 15),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 3, 15),
  ],
  15: [
    new WorkPlace(13, 2, 0),
    new WorkPlace(12, 3, 0),
    new WorkPlace(8, 2, 15),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 3, 15),
  ],
  // pattern: 6 - 14
  // e16
  16: [new WorkPlace(6, 2, 15), new WorkPlace(14, 3, 0)],
  // pattern: 15
  // e17
  17: [new WorkPlace(15, 3, 15)],
  // pattern: 6 - 8 - 7 - 9
  // e18
  18: [
    new WorkPlace(6, 3, 15),
    new WorkPlace(8, 3, 20),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 2, 15),
  ],
  19: [
    new WorkPlace(6, 3, 15),
    new WorkPlace(8, 3, 25),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 2, 20),
  ],
  20: [
    new WorkPlace(6, 3, 15),
    new WorkPlace(8, 3, 20),
    new WorkPlace(7, 2, 20),
    new WorkPlace(9, 2, 15),
  ],
  // pattern: 7 - 15
  // e26
  26: [new WorkPlace(7, 2, 30), new WorkPlace(15, 3, 15)],
  // pattern: 1
  // e49
  49: [new WorkPlace(1, 6, 20)],
  54: [new WorkPlace(1, 6, 20)],
  29: [new WorkPlace(1, 6, 20)],
  // pattern: 2
  // e50
  50: [new WorkPlace(2, 5, 30)],
  55: [new WorkPlace(2, 5, 30)],
  30: [new WorkPlace(2, 5, 20)],
  // pattern: 3
  // e51
  51: [new WorkPlace(3, 5, 20)],
  56: [new WorkPlace(3, 6, 20)],
  31: [new WorkPlace(3, 6, 20)],
};
