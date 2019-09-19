import * as actionTypes from "./actionTypes";

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

export const purchaseBurger = (orderData , token) => {
  return {
    type : actionTypes.PURCHASE_BURGER_SAGA,
    orderData : orderData,
    token : token
  }
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

export const fetchOrders = (token , userId) => {
 return {
  type : actionTypes.FETCH_ORDERS_SAGA,
  token : token,
  userId : userId
 };
}