
import { useState } from 'react';
import ChessBoard from '../components/ChessBoard';
import GameInfo from '../components/GameInfo';

const Index = () => {
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameStatus, setGameStatus] = useState('ongoing');
  const [moveHistory, setMoveHistory] = useState([]);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });

  const handleTurnChange = () => {
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };

  const addMoveToHistory = (move) => {
    setMoveHistory(prev => [...prev, move]);
  };

  const addCapturedPiece = (piece) => {
    const pieceColor = piece === piece.toUpperCase() ? 'white' : 'black';
    setCapturedPieces(prev => ({
      ...prev,
      [pieceColor]: [...prev[pieceColor], piece]
    }));
  };

  const resetGame = () => {
    setCurrentPlayer('white');
    setGameStatus('ongoing');
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-foreground p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Futuristic Chess
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col xl:flex-row items-start justify-center gap-8 max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            <ChessBoard 
              currentPlayer={currentPlayer} 
              onTurnChange={handleTurnChange} 
              setGameStatus={setGameStatus}
              onMoveHistory={addMoveToHistory}
              onPieceCapture={addCapturedPiece}
            />
          </div>
          
          <div className="flex-1 max-w-md">
            <GameInfo 
              currentPlayer={currentPlayer} 
              gameStatus={gameStatus} 
              moveHistory={moveHistory}
              capturedPieces={capturedPieces}
              onResetGame={resetGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
