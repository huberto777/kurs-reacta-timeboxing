import React from "react";
import { connect } from "react-redux";
import { getFinishedTimeboxes } from "../reducers";

function FinishedTimeboxesList({ timeboxes }) {
  return (
    <>
      {timeboxes.map(({ id, title, totalTimeInMinutes }) => (
        <div className="TimeboxFinished" key={id}>
          <h3>
            {title} - {totalTimeInMinutes} min.
          </h3>
        </div>
      ))}
    </>
  );
}

const mapStateToProps = (state) => {
  const timeboxes = getFinishedTimeboxes(state);
  // console.log(timeboxes);
  return { timeboxes };
};

export default connect(mapStateToProps)(FinishedTimeboxesList);
