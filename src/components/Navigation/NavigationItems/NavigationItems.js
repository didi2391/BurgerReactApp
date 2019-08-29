import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from '../NavigationItems/Navigationitem/NavigationItem';

const navItems = () => (
  <ul className={classes.NavigationItems}>
      <NavigationItem link='/' active>Burger Builder</NavigationItem>
      <NavigationItem link='/'>Checkout</NavigationItem>
  </ul>
);

export default navItems;
