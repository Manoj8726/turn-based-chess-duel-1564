import { CircleDot, Hexagon, Triangle, Star, Crown, Zap, Rocket } from 'lucide-react';

const ChessPiece = ({ piece }) => {
  const color = piece === piece.toUpperCase() ? 'text-primary' : 'text-destructive';
  const size = 40;

  const getPieceComponent = () => {
    switch (piece.toLowerCase()) {
      case 'p':
        return <CircleDot size={size} />;
      case 'r':
        return <Rocket size={size} />;
      case 'n':
        return <Triangle size={size} />;
      case 'b':
        return <Zap size={size} />;
      case 'q':
        return <Star size={size} />;
      case 'k':
        return <Crown size={size} />;
      default:
        return null;
    }
  };

  return <div className={`${color} transition-all duration-300 hover:scale-110`}>{getPieceComponent()}</div>;
};

export default ChessPiece;
