import { Formik, useFormik } from 'formik';
import { object, string, number, date, InferType, ref } from 'yup';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const BasicForm = (props) => {
  const submitHandler = (values) => {
    alert(JSON.stringify(values));
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: submitHandler,
    validationSchema: object({
      firstName: string()
        .min(3, 'Must be at least 3 character')
        .required('Please enter your first name'),
      lastName: string()
        .min(3, 'Must be at least 3 character')
        .required('Please enter your last name'),
      email: string()
        .email('Please enter a valid email')
        .required('Please enter your email'),
      password: string()
        .min(6, 'Must be at least 6 character')
        .required('Please enter your password')
        .matches(/^(?=.*[a-z])/, ' Must Contain One Lowercase Character')
        .matches(/^(?=.*[A-Z])/, '  Must Contain One Uppercase Character')
        .matches(/^(?=.*[0-9])/, '  Must Contain One Number Character')
        .matches(
          /^(?=.*[!@#\$%\^&\*])/,
          '  Must Contain  One Special Case Character'
        ),
      confirmPassword: string()
        .min(6, 'Must be at least 6 character')
        .required('Please enter your confirm password')
        .oneOf(
          [ref('password'), null],
          'Confirm password must match with password'
        ),
    }),
  });

  console.log(Object.keys(errors).length);

  return (
    <form onSubmit={handleSubmit}>
      <div className="control-group">
        <div className={`form-control ${errors.firstName && 'invalid'}`}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="firstName" // harus sama dengan properti inisial value
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </div>
        <div className={`form-control ${errors.lastName && 'invalid'}`}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </div>
      </div>
      <div className={`form-control ${errors.email && 'invalid'}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>
      <div className={`form-control ${errors.password && 'invalid'}`}>
        <label htmlFor="password">Your Password</label>
        <input
          type="password"
          id="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>
      <div className={`form-control ${errors.confirmPassword && 'invalid'}`}>
        <label htmlFor="confirmPassword">Confirm Your Password</label>
        <input
          type="confirmPassword"
          id="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="error-text">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={Object.keys(errors).length !== 0}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
