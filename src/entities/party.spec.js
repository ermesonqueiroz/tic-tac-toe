const { randomUUID } = require('node:crypto');
const { Match } = require('./match');
const { Turn } = require('./turn');

describe('Match entity', () => {
  it('Should create a match', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(0);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBeNull();
  });

  it('Should player one win with a horizontal line', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '1B'),
      new Turn(playerOne, '2A'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '3A'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBe(playerOne);
  });

  it('Should player two win with a horizontal line', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '1B'),
      new Turn(playerTwo, '1A'),
      new Turn(playerOne, '2B'),
      new Turn(playerTwo, '2A'),
      new Turn(playerOne, '1C'),
      new Turn(playerTwo, '3A'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBe(playerTwo);
  });

  it('Should player one win with a vertical line', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '2A'),
      new Turn(playerOne, '1B'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '1C'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBe(playerOne);
  });

  it('Should player two win with a vertical line', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '2A'),
      new Turn(playerTwo, '1A'),
      new Turn(playerOne, '2B'),
      new Turn(playerTwo, '1B'),
      new Turn(playerOne, '3A'),
      new Turn(playerTwo, '1C'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBe(playerTwo);
  });

  it('Should player one win with a diagonal line', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '2A'),
      new Turn(playerOne, '2B'),
      new Turn(playerTwo, '3A'),
      new Turn(playerOne, '3C'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBe(playerOne);
  });

  it('Should player two win with a diagonal line', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '1C'),
      new Turn(playerOne, '2A'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '1B'),
      new Turn(playerTwo, '3A'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBe(playerTwo);
  });

  it('Should not add turns when a player has already won', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '1C'),
      new Turn(playerOne, '2A'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '1B'),
      new Turn(playerTwo, '3A'),
      new Turn(playerOne, '3B'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length - 1);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBe(playerTwo);
  });

  it('Should not add consecutive turns of the same player', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '2A'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '2B'),
      new Turn(playerTwo, '3A'),
      new Turn(playerOne, '3C'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length - 1);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.winner).toBe(playerOne);
  });

  it('Should not add turn with duplicated position', () => {
    const id = randomUUID();
    const playerOne = randomUUID();
    const playerTwo = randomUUID();

    const match = new Match({
      id,
      players: [playerOne, playerTwo],
    });

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '2A'),
      new Turn(playerOne, '3A'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '2C'),
      new Turn(playerTwo, '1B'),
      new Turn(playerOne, '3B'),
      new Turn(playerTwo, '3C'),
      new Turn(playerOne, '1C'),
    ];

    turns.forEach((turn) => match.addTurn(turn));

    expect(match).toBeInstanceOf(Match);
    expect(match.id).toBe(id);
    expect(match.turns).toHaveLength(turns.length);
    expect(match.players).toEqual([playerOne, playerTwo]);
    expect(match.draw).toBeTruthy();
    expect(match.winner).toBeNull();
    expect(match.finished).toBeTruthy();
  });
});
