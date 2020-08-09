import React from 'react';
import { useFormik } from 'formik';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length < 3) {
    errors.title = 'Must be 3 characters or less';
  }

  if (!values.totalTimeInMinutes) {
    errors.totalTimeInMinutes = 'Required';
  } else if (values.totalTimeInMinutes <= 0) {
    errors.totalTimeInMinutes = 'Must be greater than 0';
  }

  return errors;
};

const TimeboxCreator = ({ onCreate, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      totalTimeInMinutes: '',
      finished: false,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      onCreate(values);
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="TimeboxCreator">
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
      {formik.touched.title && formik.errors.title ? (
        <div className="error">{formik.errors.title}</div>
      ) : null}
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
      {formik.touched.totalTimeInMinutes && formik.errors.totalTimeInMinutes ? (
        <div className="error">{formik.errors.totalTimeInMinutes}</div>
      ) : null}
      <br />
      <button className="saveButton" type="submit">
        <i className="fas fa-save" />
      </button>
      <button className="cancelButton" onClick={onClose}>
        <i className="fas fa-window-close" />
      </button>
    </form>
  );
};

// class TimeboxCreator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.titleInput = React.createRef();
//     this.totalTimeInMinutesInput = React.createRef();
//   }
//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.onCreate({
//       title: this.titleInput.current.value,
//       totalTimeInMinutes: this.totalTimeInMinutesInput.current.value,
//       finished: false,
//     });
//     this.titleInput.current.value = "";
//     this.totalTimeInMinutesInput.current.value = "";
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit} className="TimeboxCreator">
//         <label>
//           Co robisz?
//           <input ref={this.titleInput} type="text" />
//         </label>
//         <br />
//         <label>
//           Ile minut?
//           <input ref={this.totalTimeInMinutesInput} type="number" step="0.01" />
//         </label>
//         <br />
//         <button>Dodaj timebox</button>
//       </form>
//     );
//   }
// }

export default TimeboxCreator;
