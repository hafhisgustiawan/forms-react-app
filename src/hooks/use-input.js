import { useState, useReducer } from 'react';

const initialInputState = {
  value: '',
  touched: false,
};

const inputReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      touched: state.touched,
    };
  }
  if (action.type === 'BLUR') {
    return {
      value: state.value,
      touched: true,
    };
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      touched: false,
    };
  }
  return initialInputState;
};

const useInput = (validateValueFn) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

  // const [value, setValue] = useState('');
  // const [touched, setTouched] = useState(false);

  const isValid = validateValueFn(inputState.value);
  const hasError = !isValid && inputState.touched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    hasError,
    isValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
