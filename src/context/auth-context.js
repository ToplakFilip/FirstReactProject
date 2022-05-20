import React from "react";

const AuthContext = React.createContext({
  user: [],
  isLoading: "",
  httpError: "",
  isLoggedIn: false,
  onLogout: () => {},
  addUser: () => {},
  loginUser: () => {},
});

export default AuthContext;
