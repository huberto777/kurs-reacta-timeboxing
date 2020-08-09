import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
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
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        className={currentTimebox ? 'inactive' : 'editButton'}
        disabled={currentTimebox}
        onClick={onEdit}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button className="startButton" onClick={onMakeCurrent}>
        <FontAwesomeIcon icon={faHourglassStart} />
      </button>
    </div>
  );
}

export default connect(mapStateToProps)(Timebox);
