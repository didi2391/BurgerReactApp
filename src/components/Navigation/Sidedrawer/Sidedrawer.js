import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import classes from "./Sidedrawer.module.css";

const sideDrawer = () => {
  return (
    <div className={classes.Sidedrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
