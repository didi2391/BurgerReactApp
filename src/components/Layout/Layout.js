import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Classes from "./Layout.module.css";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <Sidedrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
