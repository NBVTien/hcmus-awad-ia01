import { useState } from 'react';
import Board from './components/Board';
import { BOARD_SIZE } from './utils';
import { calculateWinner } from './utils/gameLogic';
import './App.css';

/**
 * The Game component represents the entire Tic-Tac-Toe game.
 *
 * @returns {JSX.Element}
 */
export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
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

  let moves = history.map((step, move) => {
    let description;
    if (move > 0) {
      const { row, col } = step.location;
      description = `Go to move #${move} (${row}, ${col})`;
    } else {
      description = 'Go to game start';
    }

    // Show current move as text instead of button
    if (move === currentMove) {
      return (
        <li key={move}>
          <span className="current-move">You are at move #{move}</span>
        </li>
      );
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Sort moves based on toggle
  if (!isAscending) {
    moves = moves.slice().reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <button className="sort-button" onClick={toggleSort}>
          Sort: {isAscending ? 'Ascending ↓' : 'Descending ↑'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}