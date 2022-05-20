import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card";
import classes from "./Register.module.css";
import Button from "../UI/Button";
import Input from "../UI/Input";

const usernameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 5 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 5 };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Register = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const { isValid: usernameIsValid } = usernameState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(usernameIsValid && passwordIsValid);
    }, 1000);

    return () => {
      clearTimeout(identifier);
    };
  }, [usernameIsValid, passwordIsValid]);

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(event.target.value.length > 5 && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(event.target.value.length > 6 && usernameState.isValid);
  };

  const validateUsernameHandler = () => {
    dispatchUsername({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onRegister(usernameState.value, passwordState.value);
  };

  const switchToLogin = () => {
    props.isLoginScreen(true);
  };

  return (
    <Card className={classes.register}>
      <form onSubmit={submitHandler}>
        <Input
          id="username"
          type="username"
          label="Username"
          isValid={usernameIsValid}
          value={usernameState.value}
          onChange={usernameChangeHandler}
          onBlur={validateUsernameHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Register
          </Button>
        </div>
      </form>
      <Button type="button" className={classes.btn} onClick={switchToLogin}>
        Switch to login
      </Button>
    </Card>
  );
};

export default Register;
