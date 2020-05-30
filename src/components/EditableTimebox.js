import React from "react";
import { connect } from "react-redux";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import { isTimeboxEdited } from "../reducers";
import {
  startEditingTimebox,
  stopEditingTimebox,
  makeTimeboxCurrent,
} from "../actions";

const mapStateToProps = (state, ownProps) => ({
  isEdited: isTimeboxEdited(state, ownProps.timebox),
});
const mapDispatchToProps = (dispatch, ownProps) => {
  const onEdit = () => dispatch(startEditingTimebox(ownProps.timebox.id));
  const onCancel = () => dispatch(stopEditingTimebox());
  const onMakeCurrent = () => dispatch(makeTimeboxCurrent(ownProps.timebox));

  return { onEdit, onCancel, onMakeCurrent };
};
export const EditableTimebox = connect(
  mapStateToProps,
  mapDispatchToProps
)(function EditableTimebox({
  timebox,
  isEdited,
  onEdit,
  onCancel,
  onUpdate,
  onDelete,
  onMakeCurrent,
}) {
  return (
    <>
      {isEdited ? (
        <TimeboxEditor
          initialTitle={timebox.title}
          initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
          onCancel={onCancel}
          onUpdate={onUpdate}
        />
      ) : (
        <Timebox
          key={timebox.id}
          title={timebox.title}
          totalTimeInMinutes={timebox.totalTimeInMinutes}
          onDelete={onDelete}
          onEdit={onEdit}
          onMakeCurrent={onMakeCurrent}
        />
      )}
    </>
  );
});
