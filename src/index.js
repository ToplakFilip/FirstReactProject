import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import AuthenticationProvider from "./context/AuthenticationProvider";
import ItemProvider from "./context/ItemProvider";

ReactDOM.render(
  <AuthenticationProvider>
    <ItemProvider>
      <App />
    </ItemProvider>
  </AuthenticationProvider>,
  document.getElementById("root")
);
