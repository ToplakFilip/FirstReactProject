import { useState } from "react";
import AuthContext from "./auth-context";

const AuthenticationProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addUserHandler = (user) => {
    setIsLoading(true);
    addUserHttp(user).catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  };
  async function addUserHttp(user) {
    const response = await fetch(
      `https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses/${user.username}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: user.password }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    const userData = {
      key: responseData.name,
      username: user.username,
      password: user.password,
    };
    setCurrentUser(userData);

    localStorage.setItem("isLoggedIn", 1);
    localStorage.setItem("userId", userData.username);
    localStorage.setItem("username", userData.username);
    setIsLoggedIn(true);
    setIsLoading(false);
    return userData;
  }

  const loginUserHandler = (user) => {
    setIsLoading(true);
    loginUserHttp(user).catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  };

  async function loginUserHttp(user) {
    let httpUrl = `https://expenses-ce488-default-rtdb.europe-west1.firebasedatabase.app/expenses/${user.username}.json`;

    const response = await fetch(httpUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();
    const userData = {
      key: responseData.name,
      username: user.username,
      password: responseData.password,
    };

    if (user.password === responseData.password) {
      setCurrentUser(userData);

      localStorage.setItem("isLoggedIn", 1);
      localStorage.setItem("userId", userData.username);
      localStorage.setItem("username", userData.username);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setCurrentUser(undefined);
    setIsLoggedIn(false);
    window.location.reload();
  };

  const userContext = {
    user: currentUser,
    isLoading: isLoading,
    httpError: httpError,
    addUser: addUserHandler,
    loginUser: loginUserHandler,
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={userContext} delayUpdate={true}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
