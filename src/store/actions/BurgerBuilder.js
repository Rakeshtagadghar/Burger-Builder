import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";
export const addIngredient = name => {
  return {
    ingredientName: name,
    type: actionTypes.ADD_INGREDIENT
  };
};

export const removeIngredient = name => {
  return {
    ingredientName: name,
    type: actionTypes.REMOVE_INGREDIENT
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    initIngredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://burger-app-aa7c3.firebaseio.com/ingredients.json")
      .then(response => {
        console.log(response);
        dispatch(setIngredients(response.data));
      })
      .catch(dispatch => dispatch(fetchIngredientsFailed()));
  };
};
