import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/order.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        console.log(fetchedOrders);
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ lloading: false });
      });
  }
  render() {
    let orders = null;

    if (this.state.orders.length > 0) {
      orders = this.state.orders.map((el, i) => {
        return <Order key={i} ingredients={el.ingredients} price={el.price} />;
      });
    }

    if (this.state.loading) {
      orders = <Spinner />;
    }
    return <div>{orders}</div>;
  }
}

export default WithErrorHandler(Orders, axios);
