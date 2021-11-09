import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { LS_API_TOKEN } from "./constants";
import axios, { setToken } from "./axios";

document.addEventListener("DOMContentLoaded", async () => {
  const adminRoleId = 1;
  const apiToken = localStorage.getItem(LS_API_TOKEN);
  let preloadedStore = {};

  if (apiToken) {
    setToken(apiToken);
    try {
      let result = await axios.get("/me");
      preloadedStore = {
        auth: {
          isLoading: false,
          user: { ...result },
          isAdmin: result.role_id == adminRoleId,
          isLoggedIn: true,
          errors: {},
        },
        cart: { items: result.carts, checkout: result.checkout },
      };
    } catch (err) {}
  }

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store(preloadedStore)}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
