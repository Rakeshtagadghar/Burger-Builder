import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = props => (
  <li className={classes.NavigationItem}>
    <a href={props.link} classes={props.active ? classes.active : null}>
      {props.children}
    </a>
  </li>
);

export default NavigationItem;
