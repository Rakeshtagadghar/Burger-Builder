import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("[ordersummary.js] update");
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey, i) => {
        return (
          <li key={igKey + i}>
            <span style={{ textTransform: "Capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <>
        <h3>Your order</h3>
        <p>A Delicious Burger with the following Ingredients: </p>
        <ul>{ingredientsSummary}</ul>
        <p>Continue to Checkout?</p>
        <p>
          <strong>Your Price: {this.props.price}</strong>
        </p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinue} btnType="Success">
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
