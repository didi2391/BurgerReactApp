import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers , compose} from "redux";
import thunk from "redux-thunk";

import "./styles.css";
import App from "../src/App";
import burgerBuilderReducer from "./store/reducers/BurgerBuilder";
import orderReducers from "./store/reducers/order";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducers
});

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
