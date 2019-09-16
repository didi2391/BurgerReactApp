import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItems/Navigationitem/NavigationItem";

const navItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  </ul>
);

export default navItems;
