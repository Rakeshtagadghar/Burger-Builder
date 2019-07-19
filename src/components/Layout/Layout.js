import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDraweHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  toolbarDraweHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !this.state.showSideDrawer };
    });
  };

  render() {
    return (
      <>
        <Toolbar toggle={this.toolbarDraweHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDraweHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
