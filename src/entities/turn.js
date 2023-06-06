class Turn {
  constructor(playerId, position) {
    if (!Turn.positionIsValid(position))
      throw new Error(`Position '${position}' is invalid.`)

    this.playerId = playerId
    this.position = position
  }

  static positionIsValid(position) {
    const cols = ['1', '2', '3']
    const rows = ['A', 'B', 'C']
    
    const [col, row] = position.split('')

    return cols.includes(col) && rows.includes(row)
  }
}

module.exports = {
  Turn
}
