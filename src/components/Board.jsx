import Square from './Square';
import { BOARD_SIZE } from '../utils';
import { calculateWinner } from '../utils/gameLogic';
import './Board.css';

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

  const winnerInfo = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  /** @type {string} */
  let status;
  if (winnerInfo) {
    status = 'Winner: ' + winnerInfo.winner;
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

export default Board;
