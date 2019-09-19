import { takeEvery, all } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientSaga } from './BurgerBuilder';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientSaga);
}

export function* watchOrderSaga() {
    yield all([
        takeEvery(actionTypes.FETCH_ORDERS_SAGA, fetchOrdersSaga),
        takeEvery(actionTypes.PURCHASE_BURGER_SAGA, purchaseBurgerSaga)
    ]);
}