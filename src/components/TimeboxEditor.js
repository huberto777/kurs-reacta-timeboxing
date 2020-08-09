/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useFormik } from 'formik';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length < 3) {
    errors.title = 'Must have  min 3 characters';
  }

  if (!values.totalTimeInMinutes) {
    errors.totalTimeInMinutes = 'Required';
  } else if (values.totalTimeInMinutes <= 0) {
    errors.totalTimeInMinutes = 'Must be more than 0';
  }

  return errors;
};

const TimeboxEditor = ({ initialTitle, initialTotalTimeInMinutes, onCancel, onUpdate }) => {
  const formik = useFormik({
    initialValues: {
      title: initialTitle,
      totalTimeInMinutes: initialTotalTimeInMinutes,
    },
    validate,
    onSubmit: (values) => {
      onUpdate(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="TimeboxEditor">
      <label htmlFor="title">
        Co robisz ?
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
      </label>
      {formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}
      <br />
      <label htmlFor="totalTimeInMinutes">
        Ile minut ?
        <input
          id="totalTimeInMinutes"
          name="totalTimeInMinutes"
          type="number"
          step="0.1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.totalTimeInMinutes}
        />
      </label>
      {formik.errors.totalTimeInMinutes ? (
        <div className="error">{formik.errors.totalTimeInMinutes}</div>
      ) : null}
      <br />
      <button className="cancelButton" onClick={onCancel}>
        <i className="fas fa-window-close" />
      </button>
      <button className="updateButton" type="submit">
        <i className="fas fa-pen" />
      </button>
    </form>
  );
};

// class TimeboxEditor extends React.Component {
//     constructor(props) {
//         super(props);
//         this.titleInput = React.createRef();
//         this.totalTimeInMinutesInput = React.createRef();
//     }
//     handleSubmit = (event) => {
//         event.preventDefault();
//         this.props.onUpdate({
//             title: this.titleInput.current.value,
//             totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
//         });
//         this.resetToInitialValues();
//     }
//     handleCancel = () => {
//         this.resetToInitialValues();
//         this.props.onCancel();
//     }
//     resetToInitialValues() {
//         this.titleInput.current.value = this.props.initialTitle;
//         this.totalTimeInMinutesInput.current.value = this.props.initialTotalTimeInMinutes;
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit} className="TimeboxEditor">
//                 <label>
//                     Co robisz?
//                     <input
//                         ref={this.titleInput}
//                         defaultValue={this.props.initialTitle}
//                         type="text"
//                     />
//                 </label><br/>
//                 <label>
//                     Ile minut?
//                     <input
//                         ref={this.totalTimeInMinutesInput}
//                         defaultValue={this.props.initialTotalTimeInMinutes}
//                         type="number"
//                         step="0.01"
//                     />
//                 </label><br />
//                 <a onClick={this.handleCancel}>Anuluj</a>
//                 <button
//                 >Zapisz zmiany</button>
//             </form>
//         )
//     }
// }

export default TimeboxEditor;
