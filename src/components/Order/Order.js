import React from "react";
import classes from "./Order.module.css";

const Order = props => {
  console.log(props);
  const ingredients = [];

  for (let ing in props.ingredients) {
    ingredients.push({ name: ing, amount: props.ingredients[ing] });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {ig.name}: ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>$ {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
