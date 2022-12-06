import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/config/configStore";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorkerRegistration.register();
