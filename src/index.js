import React from "react";
import { createRoot } from "react-dom/client";
import "../src/index.scss";
import App from "./app/App";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";
import reducer from "./services/reducer";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
