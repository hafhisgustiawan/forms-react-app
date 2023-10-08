import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  const {
    value: enteredName,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredemail,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim() !== '' && value.includes('@'));

  const formValid = nameIsValid && lastNameIsValid && emailIsValid;

  const submitHandler = (e) => {
    e.preventDefault();

    resetName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={`form-control ${nameHasError && 'invalid'}`}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className="error-text">First name must not be empty</p>
          )}
        </div>
        <div className={`form-control ${lastNameHasError && 'invalid'}`}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
          />
          {lastNameHasError && (
            <p className="error-text">Last name must not be empty</p>
          )}
        </div>
      </div>
      <div className={`form-control ${emailHasError && 'invalid'}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={enteredemail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Email must not be empty or not valid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
