function generateRandomTurnPosition() {
  const cols = ['1', '2', '3']
  const rows = ['A', 'B', 'C']

  return [
    cols[Math.floor(Math.random() * 2)],
    rows[Math.floor(Math.random() * 2)],
  ].join('')
}

module.exports = {
  generateRandomTurnPosition,
}
