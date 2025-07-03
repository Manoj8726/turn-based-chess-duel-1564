
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Trophy, Clock, Sword } from 'lucide-react';
import ChessPiece from './ChessPiece';

const GameInfo = ({ currentPlayer, gameStatus, moveHistory, capturedPieces, onResetGame }) => {
  const formatPlayerName = (player) => {
    return player.charAt(0).toUpperCase() + player.slice(1);
  };

  const getPlayerColor = (player) => {
    return player === 'white' ? 'text-cyan-400' : 'text-purple-400';
  };

  return (
    <div className="space-y-4">
      {/* Current Turn Card */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="w-5 h-5 text-cyan-400" />
            Current Turn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-bold ${getPlayerColor(currentPlayer)}`}>
              {formatPlayerName(currentPlayer)}
            </span>
            <Badge 
              variant={currentPlayer === 'white' ? 'default' : 'secondary'}
              className="text-lg px-3 py-1"
            >
              {currentPlayer === 'white' ? '●' : '○'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Game Status Card */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Game Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge 
            variant={gameStatus === 'ongoing' ? 'outline' : 'destructive'}
            className="text-lg px-3 py-1 w-full justify-center"
          >
            {gameStatus}
          </Badge>
          
          {gameStatus !== 'ongoing' && (
            <Button
              className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold"
              onClick={onResetGame}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Game
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Captured Pieces Card */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sword className="w-5 h-5 text-red-400" />
            Captured Pieces
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">White Captured:</h4>
            <div className="flex flex-wrap gap-1 min-h-[40px] p-2 bg-slate-700 rounded-md">
              {capturedPieces.white.map((piece, index) => (
                <div key={index} className="scale-75">
                  <ChessPiece piece={piece} />
                </div>
              ))}
              {capturedPieces.white.length === 0 && (
                <span className="text-gray-500 text-sm">None</span>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Black Captured:</h4>
            <div className="flex flex-wrap gap-1 min-h-[40px] p-2 bg-slate-700 rounded-md">
              {capturedPieces.black.map((piece, index) => (
                <div key={index} className="scale-75">
                  <ChessPiece piece={piece} />
                </div>
              ))}
              {capturedPieces.black.length === 0 && (
                <span className="text-gray-500 text-sm">None</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Move History Card */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Move History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            {moveHistory.length > 0 ? (
              <div className="space-y-2">
                {moveHistory.map((move, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-700 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                      <ChessPiece piece={move.piece} />
                      <span className={`font-mono text-sm ${getPlayerColor(move.player)}`}>
                        {move.notation}
                      </span>
                    </div>
                    {move.captured && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-red-400">×</span>
                        <ChessPiece piece={move.captured} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No moves yet
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameInfo;
