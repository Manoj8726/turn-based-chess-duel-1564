
import { CircleDot, Castle, Triangle, Zap, Star, Crown } from 'lucide-react';

const ChessPiece = ({ piece }) => {
  const isWhite = piece === piece.toUpperCase();
  const color = isWhite ? 'text-cyan-400' : 'text-purple-400';
  const size = 32;

  const getPieceComponent = () => {
    switch (piece.toLowerCase()) {
      case 'p':
        return <CircleDot size={size} className="drop-shadow-lg" />;
      case 'r':
        return <Castle size={size} className="drop-shadow-lg" />;
      case 'n':
        return <Triangle size={size} className="drop-shadow-lg" />;
      case 'b':
        return <Zap size={size} className="drop-shadow-lg" />;
      case 'q':
        return <Star size={size} className="drop-shadow-lg" />;
      case 'k':
        return <Crown size={size} className="drop-shadow-lg" />;
      default:
        return null;
    }
  };

  return (
    <div className={`${color} transition-all duration-300 hover:scale-110 filter drop-shadow-md`}>
      {getPieceComponent()}
    </div>
  );
};

export default ChessPiece;
