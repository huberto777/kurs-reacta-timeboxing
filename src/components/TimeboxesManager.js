import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalDialog from './ModalDialog';
import TimeboxesAPI from '../api/FakeTimeboxesApi';
import AuthenticationContext from '../contexts/AuthenticationContext';
import FinishedTimeboxesList from './FinishedTimeboxesList';
import { RemainingTimeboxesList } from './TimeboxesList';
// import ReadOnlyTimebox from "./ReadOnlyTimebox";
import { areTimeboxesLoading, getTimeboxesLoadingError, timeboxIsCreating } from '../reducers';
import {
  fetchAllTimeboxes,
  addTimebox,
  replaceTimebox,
  removeTimeboxRemotely,
  stopEditingTimebox,
  searchInput,
  setTimeboxCreating,
  cancelTimeboxCreating,
} from '../actions';
import { EditableTimebox } from './EditableTimebox';
import SearchTimeboxes from './SearchTimeboxes';

function TimeboxesManager() {
  const dispatch = useDispatch();
  const { accessToken } = useContext(AuthenticationContext);

  const timeboxesLoading = useSelector(areTimeboxesLoading);
  const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);
  const timeboxCreating = useSelector(timeboxIsCreating);

  useEffect(() => {
    dispatch(fetchAllTimeboxes(accessToken));
    return () => {};
  }, [accessToken, dispatch]);

  const handleCreate = (createdTimebox) => {
    try {
      TimeboxesAPI.addTimebox(createdTimebox, accessToken).then(
        (addedTimebox) => dispatch(addTimebox(addedTimebox)),
        dispatch(cancelTimeboxCreating()),
      );
    } catch (error) {
      console.log('Jest błąd przy tworzeniu timeboxa:', error);
    }
  };
  const renderTimebox = (timebox) => {
    const onUpdate = (updatedTimebox) => {
      const timeboxToUpdate = { ...timebox, ...updatedTimebox };
      TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken).then((replacedTimebox) =>
        dispatch(replaceTimebox(replacedTimebox)),
      );
      dispatch(stopEditingTimebox());
    };
    const onDelete = () => dispatch(removeTimeboxRemotely(timebox, accessToken));

    return (
      <EditableTimebox key={timebox.id} timebox={timebox} onUpdate={onUpdate} onDelete={onDelete} />
    );
  };
  // function renderReadOnlyTimebox(timebox, index) {
  //   return (
  //     <ReadOnlyTimebox
  //       key={timebox.id}
  //       title={timebox.title}
  //       totalTimeInMinutes={timebox.totalTimeInMinutes}
  //     />
  //   );
  // }
  return (
    <>
      <SearchTimeboxes search={(e) => dispatch(searchInput(e))} />
      {timeboxCreating ? (
        <ModalDialog onClose={() => dispatch(cancelTimeboxCreating())} onCreate={handleCreate} />
      ) : (
        <button className="addButton" onClick={() => dispatch(setTimeboxCreating())}>
          +
        </button>
      )}
      {timeboxesLoading ? 'Timeboxy się ładują...' : null}
      {timeboxesLoadingError ? 'Nie udało się załadować :(' : null}
      <RemainingTimeboxesList renderTimebox={renderTimebox} />
      <FinishedTimeboxesList />
    </>
  );
}

export default TimeboxesManager;
