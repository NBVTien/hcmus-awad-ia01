import { useState } from 'react';
import { Board, GameInfo } from './components';
import { BOARD_SIZE } from './utils';
import { calculateWinner } from './utils/gameLogic';
import './App.css';

/**
 * The Game component represents the entire Tic-Tac-Toe game.
 *
 * @returns {JSX.Element}
 */
export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null), location: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, squareIndex) {
    const row = Math.floor(squareIndex / BOARD_SIZE) + 1;
    const col = (squareIndex % BOARD_SIZE) + 1;
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: { row, col } }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSort() {
    setIsAscending(!isAscending);
  }

  const winnerInfo = calculateWinner(currentSquares);
  const winningSquares = winnerInfo ? winnerInfo.line : null;

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game-panel">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winningSquares={winningSquares}
          />
        </div>
        <GameInfo
          history={history}
          currentMove={currentMove}
          isAscending={isAscending}
          onJumpTo={jumpTo}
          onToggleSort={toggleSort}
        />
      </div>
    </>
  );
}