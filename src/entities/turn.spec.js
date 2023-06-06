const { randomUUID } = require('node:crypto');
const { Turn } = require('./turn');
const { generateRandomTurnPosition } = require('../utils/turn');

describe('Turn entity', () => {
  it('Should create a turn', () => {
    const playerId = randomUUID();
    const position = generateRandomTurnPosition();

    const turn = new Turn(playerId, position);

    expect(turn).toBeInstanceOf(Turn);
    expect(turn.playerId).toBe(playerId);
    expect(turn.position).toBe(position);
    expect(Turn.positionIsValid(turn.position)).toBeTruthy();
  });

  it('Should not create a turn with invalid position', () => {
    const playerId = randomUUID();
    const position = '4A';

    expect(
      () => new Turn(playerId, position),
    ).toThrowError();
    expect(Turn.positionIsValid(position)).toBeFalsy();
  });
});
