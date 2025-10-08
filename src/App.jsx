import { useState } from 'react';
import { X, Circle } from 'lucide-react';
import './App.css';

const BOARD_SIZE = 3;

/**
 * The Square component represents a single square in the Tic-Tac-Toe board.
 *
 * @param {{ value: string, onSquareClick: function, isWinning: boolean }} props - The properties for the Square component.
 *
 * @returns {JSX.Element}
 */
function Square({ value, onSquareClick, isWinning }) {
  return (
    <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onSquareClick}>
      {value === 'X' && <X size={48} strokeWidth={3} />}
      {value === 'O' && <Circle size={48} strokeWidth={3} />}
    </button>
  );
}

/**
 * The Board component represents the Tic-Tac-Toe board.
 *
 * @param {{ xIsNext: boolean, squares: string[], onPlay: function, winningSquares: number[] }} props - The properties for the Board component.
 * 
 * @returns {JSX.Element}
 */
function Board({ xIsNext, squares, onPlay, winningSquares }) {

  /**
   * Handles a click on a square.
   *
   * @param {number} i - The index of the square that was clicked.
   * @returns {void}
   */
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    /** @type {string[]} */
    const nextSquares = squares.slice();
    
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  /** @type {string} */
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isBoardFull) {
    status = 'Draw - No winner!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {[...Array(BOARD_SIZE)].map((_, row) => (
        <div key={row} className="board-row">
          {[...Array(BOARD_SIZE)].map((_, col) => {
            const index = row * BOARD_SIZE + col;
            const isWinningSquare = winningSquares && winningSquares.includes(index);
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                isWinning={isWinningSquare}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

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

/**
 * Calculates the winner of the Tic-Tac-Toe game.
 *
 * @param {string[]} squares - The current state of the game board.
 * @returns {{winner: string, line: number[]}|null} - The winner ('X' or 'O') with winning line or null if there is no winner.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}