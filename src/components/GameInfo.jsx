import './GameInfo.css';

/**
 * The GameInfo component displays the game history and controls.
 *
 * @param {{ history: Array, currentMove: number, isAscending: boolean, onJumpTo: function, onToggleSort: function }} props - The properties for the GameInfo component.
 *
 * @returns {JSX.Element}
 */
export default function GameInfo({ history, currentMove, isAscending, onJumpTo, onToggleSort }) {
  return (
    <div className="game-info">
      <table className="moves-table">
        <thead>
          <tr>
            <th>
              <div className="action-header">
                <span>Action</span>
                <button className="sort-button" onClick={onToggleSort}>
                  {isAscending ? '↓' : '↑'}
                </button>
              </div>
            </th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {(isAscending ? history : history.slice().reverse()).map((step, index) => {
            const actualMove = isAscending ? index : history.length - 1 - index;
            const isCurrentMove = actualMove === currentMove;
            const actionText = isCurrentMove 
              ? `You are at move #${actualMove}` 
              : `Go to move #${actualMove}`;
            const position = actualMove > 0 && step.location 
              ? `(${step.location.row}, ${step.location.col})` 
              : actualMove === 0 ? 'Start' : '-';

            return (
              <tr 
                key={actualMove} 
                className={isCurrentMove ? 'current-move-row' : 'clickable-row'}
                onClick={!isCurrentMove ? () => onJumpTo(actualMove) : undefined}
                style={{ cursor: isCurrentMove ? 'default' : 'pointer' }}
              >
                <td className={isCurrentMove ? 'current-move-text' : ''}>{actionText}</td>
                <td className="position-cell">{position}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}