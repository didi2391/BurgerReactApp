import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./styles.css";
import App from "../src/App";
import burgerBuilderReducer from "./store/reducers/BurgerBuilder";

const store = createStore(burgerBuilderReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
