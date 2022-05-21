import React, { useState, useEffect, useContext } from "react";

import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ExpensesWindow from "./ExpensesWindow";
import MainHeader from "../components/MainHeader/MainHeader";
import AuthContext from "../context/auth-context";
import loaderStyle from "./Loader.module.css";

const AuthWindow = () => {
  const ctx = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

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

  const windowSwitchHandler = (isRegisterScreen) => {
    setIsRegisterScreen(isRegisterScreen);
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
      isRegisterScreen === false ? (
        <Login
          onLogin={loginHandler}
          isRegisterScreen={windowSwitchHandler}
          showErrorScreen={loginFailed}
        />
      ) : (
        <Register
          onRegister={registerHandler}
          isRegisterScreen={windowSwitchHandler}
        />
      );
  } else {
    currentWindow = <ExpensesWindow getInitialItems={ctx.isLoggedIn} />;
  }

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {currentWindow}{" "}
        {ctx.isLoading && (
          <div className={loaderStyle["lds-circle"]}>
            <div></div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export default AuthWindow;
