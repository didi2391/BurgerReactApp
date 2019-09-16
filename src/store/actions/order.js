import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBugerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBugerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBugerSuccess(response.data.name, response.data));
      })
      .catch(error => dispatch(purchaseBugerFail()));
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type : actionTypes.FETCH_ORDER_SUCCESS,
    orders : orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type : actionTypes.FETCH_ORDER_FAIL,
    error: error
  };
};

export const fetchOrderStart = () => {
  return {
    type : actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
 return dispatch => {
   dispatch(fetchOrderStart());
    axios
      .get("/orders.json")
      .then(res => {
        let fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
    };
}