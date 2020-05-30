import React from "react";
import { connect } from "react-redux";
import { getCurrentTimebox } from "../reducers";

function mapStateToProps(state) {
  const currentTimebox = getCurrentTimebox(state);

  return {
    currentTimebox,
  };
}

function Timebox({
  title,
  totalTimeInMinutes,
  onDelete,
  onEdit,
  onMakeCurrent,
  currentTimebox,
}) {
  return (
    <div className="Timebox">
      <h3>
        {title} - {totalTimeInMinutes} min.
      </h3>
      <button disabled={currentTimebox} onClick={onDelete}>
        Usuń
      </button>
      <button disabled={currentTimebox} onClick={onEdit}>
        Zmień
      </button>
      <button onClick={onMakeCurrent}>
        Zacznij teraz
      </button>
    </div>
  );
}

export default connect(mapStateToProps)(Timebox);
