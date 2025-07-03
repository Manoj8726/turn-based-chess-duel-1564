
import { useState, useEffect } from 'react';
import ChessPiece from './ChessPiece';
import { isValidMove } from '../utils/chessRules';
import { useToast } from '@/components/ui/use-toast';

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const ChessBoard = ({ currentPlayer, onTurnChange, setGameStatus, onMoveHistory, onPieceCapture }) => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const { toast } = useToast();

  const movePiece = (startPos, endPos) => {
    const newBoard = board.map(row => [...row]);
    const movingPiece = newBoard[startPos.y][startPos.x];
    const capturedPiece = newBoard[endPos.y][endPos.x];
    
    // Handle piece capture
    if (capturedPiece) {
      onPieceCapture(capturedPiece);
      toast({
        title: "Piece Captured!",
        description: `${currentPlayer} captured ${capturedPiece}`,
      });
    }
    
    newBoard[endPos.y][endPos.x] = movingPiece;
    newBoard[startPos.y][startPos.x] = null;
    
    setBoard(newBoard);
    setLastMove({ start: startPos, end: endPos });
    
    // Add to move history
    const moveNotation = `${String.fromCharCode(97 + startPos.x)}${8 - startPos.y} → ${String.fromCharCode(97 + endPos.x)}${8 - endPos.y}`;
    onMoveHistory({
      player: currentPlayer,
      piece: movingPiece,
      notation: moveNotation,
      captured: capturedPiece
    });
    
    onTurnChange();
  };

  const getPossibleMoves = (pos) => {
    const moves = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (isValidMove(board, pos, { x, y }, currentPlayer)) {
          moves.push({ x, y });
        }
      }
    }
    return moves;
  };

  const handleSquareClick = (x, y) => {
    if (selectedPiece) {
      if (isValidMove(board, selectedPiece, { x, y }, currentPlayer)) {
        movePiece(selectedPiece, { x, y });
        setSelectedPiece(null);
        setPossibleMoves([]);
      } else {
        setSelectedPiece(null);
        setPossibleMoves([]);
      }
    } else {
      const piece = board[y][x];
      if (piece && (currentPlayer === 'white' ? piece === piece.toUpperCase() : piece === piece.toLowerCase())) {
        setSelectedPiece({ x, y });
        setPossibleMoves(getPossibleMoves({ x, y }));
      }
    }
  };

  const isSquareHighlighted = (x, y) => {
    return possibleMoves.some(move => move.x === x && move.y === y);
  };

  const isLastMoveSquare = (x, y) => {
    if (!lastMove) return false;
    return (lastMove.start.x === x && lastMove.start.y === y) || 
           (lastMove.end.x === x && lastMove.end.y === y);
  };

  useEffect(() => {
    // Check for checkmate or stalemate
    const isKingCaptured = !board.flat().includes(currentPlayer === 'white' ? 'K' : 'k');
    if (isKingCaptured) {
      setGameStatus(`${currentPlayer === 'white' ? 'Black' : 'White'} wins!`);
      toast({
        title: "Game Over!",
        description: `${currentPlayer === 'white' ? 'Black' : 'White'} wins by checkmate!`,
        variant: "destructive",
      });
    }
  }, [board, currentPlayer, setGameStatus, toast]);

  return (
    <div className="relative">
      <div className="grid grid-cols-8 gap-0 border-4 border-gradient-to-r from-cyan-400 to-purple-400 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900">
        {board.map((row, y) =>
          row.map((piece, x) => {
            const isDark = (x + y) % 2 === 1;
            const isSelected = selectedPiece && selectedPiece.x === x && selectedPiece.y === y;
            const isHighlighted = isSquareHighlighted(x, y);
            const isLastMove = isLastMoveSquare(x, y);
            
            return (
              <div
                key={`${x}-${y}`}
                className={`
                  w-16 h-16 flex items-center justify-center relative cursor-pointer transition-all duration-300 hover:scale-105
                  ${isDark 
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800' 
                    : 'bg-gradient-to-br from-slate-200 to-slate-300'
                  }
                  ${isSelected ? 'ring-4 ring-cyan-400 ring-opacity-60 bg-cyan-400 bg-opacity-20' : ''}
                  ${isHighlighted ? 'ring-2 ring-green-400 ring-opacity-60' : ''}
                  ${isLastMove ? 'ring-2 ring-yellow-400 ring-opacity-60' : ''}
                `}
                onClick={() => handleSquareClick(x, y)}
              >
                {piece && <ChessPiece piece={piece} />}
                
                {isHighlighted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full ${piece ? 'ring-2 ring-green-400' : 'bg-green-400 opacity-60'}`}></div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* Coordinate labels */}
      <div className="absolute -bottom-6 left-0 right-0 flex">
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter, i) => (
          <div key={letter} className="w-16 text-center text-sm text-gray-400 font-mono">
            {letter}
          </div>
        ))}
      </div>
      
      <div className="absolute -left-6 top-0 bottom-0 flex flex-col">
        {[8, 7, 6, 5, 4, 3, 2, 1].map((number) => (
          <div key={number} className="h-16 flex items-center text-sm text-gray-400 font-mono">
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;
