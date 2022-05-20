import React, { useState, useEffect, useContext } from "react";

import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ExpensesWindow from "./ExpensesWindow";
import MainHeader from "../components/MainHeader/MainHeader";
import AuthContext from "../context/auth-context";

const AuthWindow = () => {
  const ctx = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoginScreen, setIsLoginScreen] = useState(true);

  const registerHandler = (username, password) => {
    ctx.addUser({ username, password });
    setIsLoggedIn(true);
  };

  const loginHandler = (username, password) => {
    ctx.loginUser({ username, password });
    if (ctx.user !== null && ctx.user !== undefined) {
      setIsLoggedIn(true);
    }
  };

  const windowSwitchHandler = (isLoginScreen) => {
    setIsLoginScreen(isLoginScreen);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      ctx.isLoggedIn = true;
    }
  }, []);

  let currentWindow;
  if (!ctx.isLoggedIn) {
    currentWindow =
      isLoginScreen === true ? (
        <Login onLogin={loginHandler} isLoginScreen={windowSwitchHandler} />
      ) : (
        <Register
          onRegister={registerHandler}
          isLoginScreen={windowSwitchHandler}
        />
      );
  } else {
    currentWindow = <ExpensesWindow getInitialItems={ctx.isLoggedIn} />;
  }

  return (
    <React.Fragment>
      <MainHeader />
      <main>{currentWindow}</main>
    </React.Fragment>
  );
};

export default AuthWindow;
