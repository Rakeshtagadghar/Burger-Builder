import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <p>We hope it tastes well!</p>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.checkoutCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
