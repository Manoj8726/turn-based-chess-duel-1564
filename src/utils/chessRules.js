const isValidMove = (board, startPos, endPos, currentPlayer) => {
  const piece = board[startPos.y][startPos.x];
  const targetPiece = board[endPos.y][endPos.x];

  // Check if the move is within the board
  if (endPos.x < 0 || endPos.x > 7 || endPos.y < 0 || endPos.y > 7) {
    return false;
  }

  // Check if the player is moving their own piece
  if (currentPlayer === 'white' && piece !== piece.toUpperCase()) {
    return false;
  }
  if (currentPlayer === 'black' && piece !== piece.toLowerCase()) {
    return false;
  }

  // Check if the target square is occupied by the player's own piece
  if (targetPiece && (
    (currentPlayer === 'white' && targetPiece === targetPiece.toUpperCase()) ||
    (currentPlayer === 'black' && targetPiece === targetPiece.toLowerCase())
  )) {
    return false;
  }

  // Implement piece-specific move validation
  switch (piece.toLowerCase()) {
    case 'p':
      return isValidPawnMove(board, startPos, endPos, currentPlayer);
    case 'r':
      return isValidRookMove(board, startPos, endPos);
    case 'n':
      return isValidKnightMove(startPos, endPos);
    case 'b':
      return isValidBishopMove(board, startPos, endPos);
    case 'q':
      return isValidQueenMove(board, startPos, endPos);
    case 'k':
      return isValidKingMove(startPos, endPos);
    default:
      return false;
  }
};

const isValidPawnMove = (board, startPos, endPos, currentPlayer) => {
  const direction = currentPlayer === 'white' ? -1 : 1;
  const startRow = currentPlayer === 'white' ? 6 : 1;

  // Move forward one square
  if (endPos.x === startPos.x && endPos.y === startPos.y + direction && !board[endPos.y][endPos.x]) {
    return true;
  }

  // Move forward two squares from starting position
  if (startPos.y === startRow && endPos.x === startPos.x && endPos.y === startPos.y + 2 * direction &&
      !board[endPos.y][endPos.x] && !board[startPos.y + direction][startPos.x]) {
    return true;
  }

  // Capture diagonally
  if (Math.abs(endPos.x - startPos.x) === 1 && endPos.y === startPos.y + direction && board[endPos.y][endPos.x]) {
    return true;
  }

  return false;
};

const isValidRookMove = (board, startPos, endPos) => {
  if (startPos.x !== endPos.x && startPos.y !== endPos.y) {
    return false;
  }

  const xDir = Math.sign(endPos.x - startPos.x);
  const yDir = Math.sign(endPos.y - startPos.y);

  let x = startPos.x + xDir;
  let y = startPos.y + yDir;

  while (x !== endPos.x || y !== endPos.y) {
    if (board[y][x]) {
      return false;
    }
    x += xDir;
    y += yDir;
  }

  return true;
};

const isValidKnightMove = (startPos, endPos) => {
  const dx = Math.abs(endPos.x - startPos.x);
  const dy = Math.abs(endPos.y - startPos.y);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
};

const isValidBishopMove = (board, startPos, endPos) => {
  if (Math.abs(endPos.x - startPos.x) !== Math.abs(endPos.y - startPos.y)) {
    return false;
  }

  const xDir = Math.sign(endPos.x - startPos.x);
  const yDir = Math.sign(endPos.y - startPos.y);

  let x = startPos.x + xDir;
  let y = startPos.y + yDir;

  while (x !== endPos.x && y !== endPos.y) {
    if (board[y][x]) {
      return false;
    }
    x += xDir;
    y += yDir;
  }

  return true;
};

const isValidQueenMove = (board, startPos, endPos) => {
  return isValidRookMove(board, startPos, endPos) || isValidBishopMove(board, startPos, endPos);
};

const isValidKingMove = (startPos, endPos) => {
  const dx = Math.abs(endPos.x - startPos.x);
  const dy = Math.abs(endPos.y - startPos.y);
  return dx <= 1 && dy <= 1;
};

export { isValidMove };
