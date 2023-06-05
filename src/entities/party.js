class Party {
  constructor({ id, players }) {
    this.id = id
    this.players = players
    this.turns = []
    this.winner = null
  }

  setWinner(winner) {
    this.winner = winner
  }

  addTurn(turn) {
    const playerAlreadyPlayed = this.turns.length > 0 &&
      this.turns.at(-1).playerId === turn.playerId

    if (this.winner) return
    if (playerAlreadyPlayed) return

    this.turns.push(turn)
    this.hasWinner()
  }

  hasWinner() {
    const results = this.players.map(player => {
      const playerTurns = this.turns
        .filter(({ playerId }) => player === playerId)
        .map(({ position }) => position)

      if (playerTurns.length < 3) return false
      
      const cols = ['1', '2', '3']
      const rows = ['A', 'B', 'C']

      const hasVerticalLine = cols.map(col => {
        const sameColTurns = playerTurns.filter(position => position.split('')[0] === col)
        return sameColTurns.length === 3
      }).some(result => result)

      const hasHorizontalLine = rows.map(row => {
          const sameRowTurns = playerTurns.filter(position => position.split('')[1] === row)
          return sameRowTurns.length === 3
        }).some(result => result)

      const diagonals = [
        ['1A', '2B', '3C'],
        ['1C', '2B', '3A'],
      ]
      
      const hasDiagonalLine = diagonals.map(diagonal => {
        return diagonal
          .map(position => playerTurns.includes(position))
          .every(result => result)
      }).some(result => result)

      return hasVerticalLine || hasHorizontalLine || hasDiagonalLine
    })

    results.forEach((result, i) => {
      if (result) this.setWinner(this.players[i])
    })
  
    return results.some(result => result)
  }
}

module.exports = {
  Party
}
