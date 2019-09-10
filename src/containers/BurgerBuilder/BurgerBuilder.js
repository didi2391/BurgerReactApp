import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get("https://react-my-burger-dd8a1.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }

  state = {       
    purchasing: false,
    loading: false,
    error: false
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];

    for (const key in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(this.state.ingredients[key])
      );
    }

    queryParams.push("Price=" + this.state.totalPrice);

    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disbleInfo = {
      ...this.props.ings
    };

    for (const key in disbleInfo) {
      disbleInfo[key] = disbleInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded at the moment !</p>
    ) : (
        <Spinner />
      );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disbleInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price.toFixed(2)}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings : state.ingredients,
    price : state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded : (ingName) => dispatch({type : actionTypes.ADD_INGREDIENT , ingredientName : ingName}),
    onIngredientRemoved : (ingName) => dispatch({type : actionTypes.REMOVE_INGREDIENT, ingredientName : ingName})
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
