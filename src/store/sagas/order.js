import {put} from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrderStart());

   const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

   try {
    const res = yield axios.get("https://react-my-burger-dd8a1.firebaseio.com/orders.json" + queryParams);
    let fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
   }
   catch(error) {
    yield put(actions.fetchOrdersFail(error));
   }
}

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    
    try {
        const response = yield axios.post("https://react-my-burger-dd8a1.firebaseio.com/orders.json?auth=" + action.token, action.orderData);

        yield put(actions.purchaseBugerSuccess(response.data.name, response.data));

    } catch(error) {
        yield put(actions.purchaseBugerFail());
    }
}