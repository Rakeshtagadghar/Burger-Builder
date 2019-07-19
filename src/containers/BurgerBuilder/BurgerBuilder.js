import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalprice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentWillMount() {
    axios
      .get("https://burger-app-aa7c3.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(() => this.setState({ error: true }));
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldcount = this.state.ingredients[type];
    const updatedCount = oldcount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const price = INGREDIENT_PRICES[type];
    const totalprice = this.state.totalprice + price;
    this.setState({ ingredients: updatedIngredients, totalprice: totalprice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldcount = this.state.ingredients[type];
    const updatedCount = oldcount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const price = INGREDIENT_PRICES[type];
    const totalprice = this.state.totalprice - price;
    this.setState({ ingredients: updatedIngredients, totalprice: totalprice });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalprice,
      customer: {
        name: "Rakesh Tagadghar",
        address: {
          street: "221B Baker street",
          zipCode: 500097,
          country: "India"
        },
        email: "rakeshtagadghar@gmail.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/order.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let Orders = <Spinner />;
    let burger = this.state.error ? (
      <p>Ingredients cant be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchaseable={this.state.purchaseable}
            price={this.state.totalprice}
            ordered={this.purchaseHandler}
          />
        </>
      );
      Orders = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalprice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      Orders = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {Orders}
        </Modal>
        {burger}
      </>
    );
  }
}
export default WithErrorHandler(BurgerBuilder, axios);
