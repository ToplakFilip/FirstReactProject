import React, { useState, useEffect } from 'react';

import Login from '../components/Login/Login';
import ExpensesWindow from './ExpensesWindow';
import MainHeader from '../components/MainHeader/MainHeader';
import AuthContext from '../context/auth-context';

const LoginWindow = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', 1);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <ExpensesWindow onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default LoginWindow;