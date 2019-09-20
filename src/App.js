import React, { useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from './containers/Auth/Logout/Logout';
import * as actions from '../src/store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const Checkout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const Auth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {

  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={<Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={<Checkout />} />
        <Route path="/auth" component={<Auth />} />
        <Route path="/orders" component={<Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"  />
      </Switch>
    );
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
