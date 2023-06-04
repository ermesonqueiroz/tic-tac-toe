const { Party } = require("./party")
const { Turn } = require("./turn")
const { randomUUID } = require('node:crypto')

describe('Party entity', () => {
  it('Should create a party', () => {
    const id = randomUUID()
    const playerOne = randomUUID()
    const playerTwo = randomUUID()
    
    const party = new Party({
      id,
      players: [playerOne, playerTwo]
    })

    expect(party).toBeInstanceOf(Party)
    expect(party.id).toBe(id)
    expect(party.turns).toHaveLength(0)
    expect(party.players).toEqual([playerOne, playerTwo])
    expect(party.winner).toBeNull()
  })

  it('Should player one win with a horizontal line', () => {
    const id = randomUUID()
    const playerOne = randomUUID()
    const playerTwo = randomUUID()
    
    const party = new Party({
      id,
      players: [playerOne, playerTwo]
    })

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '1B'),
      new Turn(playerOne, '2A'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '3A'),
    ]

    turns.forEach(turn => party.addTurn(turn))

    expect(party).toBeInstanceOf(Party)
    expect(party.id).toBe(id)
    expect(party.turns).toHaveLength(turns.length)
    expect(party.players).toEqual([playerOne, playerTwo])
    expect(party.winner).toBe(playerOne)
  })

  it('Should player two win with a horizontal line', () => {
    const id = randomUUID()
    const playerOne = randomUUID()
    const playerTwo = randomUUID()
    
    const party = new Party({
      id,
      players: [playerOne, playerTwo]
    })

    const turns = [
      new Turn(playerOne, '1B'),
      new Turn(playerTwo, '1A'),
      new Turn(playerOne, '2B'),
      new Turn(playerTwo, '2A'),
      new Turn(playerOne, '1C'),
      new Turn(playerTwo, '3A'),
    ]

    turns.forEach(turn => party.addTurn(turn))

    expect(party).toBeInstanceOf(Party)
    expect(party.id).toBe(id)
    expect(party.turns).toHaveLength(turns.length)
    expect(party.players).toEqual([playerOne, playerTwo])
    expect(party.winner).toBe(playerTwo)
  })

  it('Should player one win with a vertical line', () => {
    const id = randomUUID()
    const playerOne = randomUUID()
    const playerTwo = randomUUID()
    
    const party = new Party({
      id,
      players: [playerOne, playerTwo]
    })

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '2A'),
      new Turn(playerOne, '1B'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '1C'),
    ]

    turns.forEach(turn => party.addTurn(turn))

    expect(party).toBeInstanceOf(Party)
    expect(party.id).toBe(id)
    expect(party.turns).toHaveLength(turns.length)
    expect(party.players).toEqual([playerOne, playerTwo])
    expect(party.winner).toBe(playerOne)
  })

  it('Should player two win with a vertical line', () => {
    const id = randomUUID()
    const playerOne = randomUUID()
    const playerTwo = randomUUID()
    
    const party = new Party({
      id,
      players: [playerOne, playerTwo]
    })

    const turns = [
      new Turn(playerOne, '2A'),
      new Turn(playerTwo, '1A'),
      new Turn(playerOne, '2B'),
      new Turn(playerTwo, '1B'),
      new Turn(playerOne, '3A'),
      new Turn(playerTwo, '1C'),
    ]

    turns.forEach(turn => party.addTurn(turn))

    expect(party).toBeInstanceOf(Party)
    expect(party.id).toBe(id)
    expect(party.turns).toHaveLength(turns.length)
    expect(party.players).toEqual([playerOne, playerTwo])
    expect(party.winner).toBe(playerTwo)
  })

  it('Should player one win with a diagonal line', () => {
    const id = randomUUID()
    const playerOne = randomUUID()
    const playerTwo = randomUUID()
    
    const party = new Party({
      id,
      players: [playerOne, playerTwo]
    })

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '2A'),
      new Turn(playerOne, '2B'),
      new Turn(playerTwo, '3A'),
      new Turn(playerOne, '3C'),
    ]

    turns.forEach(turn => party.addTurn(turn))

    expect(party).toBeInstanceOf(Party)
    expect(party.id).toBe(id)
    expect(party.turns).toHaveLength(turns.length)
    expect(party.players).toEqual([playerOne, playerTwo])
    expect(party.winner).toBe(playerOne)
  })

  it('Should player two win with a diagonal line', () => {
    const id = randomUUID()
    const playerOne = randomUUID()
    const playerTwo = randomUUID()
    
    const party = new Party({
      id,
      players: [playerOne, playerTwo]
    })

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '1C'),
      new Turn(playerOne, '2A'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '1B'),
      new Turn(playerTwo, '3A'),
    ]

    turns.forEach(turn => party.addTurn(turn))

    expect(party).toBeInstanceOf(Party)
    expect(party.id).toBe(id)
    expect(party.turns).toHaveLength(turns.length)
    expect(party.players).toEqual([playerOne, playerTwo])
    expect(party.winner).toBe(playerTwo)
  })

  it('Should not add turns when a player has already won', () => {
    const id = randomUUID()
    const playerOne = randomUUID()
    const playerTwo = randomUUID()
    
    const party = new Party({
      id,
      players: [playerOne, playerTwo]
    })

    const turns = [
      new Turn(playerOne, '1A'),
      new Turn(playerTwo, '1C'),
      new Turn(playerOne, '2A'),
      new Turn(playerTwo, '2B'),
      new Turn(playerOne, '1B'),
      new Turn(playerTwo, '3A'),
      new Turn(playerOne, '3B'),
    ]

    turns.forEach(turn => party.addTurn(turn))

    expect(party).toBeInstanceOf(Party)
    expect(party.id).toBe(id)
    expect(party.turns).toHaveLength(turns.length - 1)
    expect(party.players).toEqual([playerOne, playerTwo])
    expect(party.winner).toBe(playerTwo)
  })
})