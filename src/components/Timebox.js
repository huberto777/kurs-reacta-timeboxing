import React from 'react';
import { connect } from 'react-redux';
import { getCurrentTimebox } from '../reducers';

function mapStateToProps(state) {
  const currentTimebox = getCurrentTimebox(state);

  return {
    currentTimebox,
  };
}

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit, onMakeCurrent, currentTimebox }) {
  return (
    <div className="Timebox">
      <h3>
        {title} - {totalTimeInMinutes} min.
      </h3>

      <button
        className={currentTimebox ? 'inactive' : 'delButton'}
        disabled={currentTimebox}
        onClick={onDelete}>
        <i className="fas fa-trash" />
      </button>
      <button
        className={currentTimebox ? 'inactive' : 'editButton'}
        disabled={currentTimebox}
        onClick={onEdit}>
        <i className="fas fa-edit" />
      </button>
      <button className="startButton" onClick={onMakeCurrent}>
        <i className="fas fa-hourglass-start" />
      </button>
    </div>
  );
}

export default connect(mapStateToProps)(Timebox);
