import './GameInfo.css';

/**
 * The GameInfo component displays the game history and controls.
 *
 * @param {{ history: Array, currentMove: number, isAscending: boolean, onJumpTo: function, onToggleSort: function }} props - The properties for the GameInfo component.
 *
 * @returns {JSX.Element}
 */
export default function GameInfo({ history, currentMove, isAscending, onJumpTo, onToggleSort }) {
  let moves = history.map((step, move) => {
    let description;
    if (move > 0) {
      const { row, col } = step.location;
      description = `Go to move #${move} (${row}, ${col})`;
    } else {
      description = 'Go to game start';
    }

    if (move === currentMove) {
      return (
        <li key={move}>
          <span className="current-move">You are at move #{move}</span>
        </li>
      );
    }

    return (
      <li key={move}>
        <button onClick={() => onJumpTo(move)}>{description}</button>
      </li>
    );
  });

  if (!isAscending) {
    moves = moves.slice().reverse();
  }

  return (
    <div className="game-info">
      <button className="sort-button" onClick={onToggleSort}>
        Sort: {isAscending ? 'Ascending ↓' : 'Descending ↑'}
      </button>
      <ol>{moves}</ol>
    </div>
  );
}