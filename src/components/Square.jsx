import { X, Circle } from 'lucide-react';
import './Square.css';

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
      {value === 'X' && <X  size={48} strokeWidth={3} />}
      {value === 'O' && <Circle size={48} strokeWidth={3} />}
      {value === null && ''}
    </button>
  );
}

export default Square;