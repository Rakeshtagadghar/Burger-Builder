import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle toggle={props.toggle}> Menu</DrawerToggle>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.Desktoponly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
