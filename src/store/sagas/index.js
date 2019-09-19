import {takeEvery} from 'redux-saga/effects';

import {logoutSaga , checkAuthTimeoutSaga , authUserSaga , authCheckStateSaga} from './auth';
import {initIngredientSaga} from './BurgerBuilder';
import {fetchOrdersSaga , purchaseBurgerSaga} from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT , checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT , logoutSaga); 
    yield takeEvery(actionTypes.AUTH_USER , authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE , authCheckStateSaga);    
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS , initIngredientSaga);
}

export function* watchOrderSaga() {
    yield takeEvery(actionTypes.FETCH_ORDERS_SAGA , fetchOrdersSaga);
    yield takeEvery(actionTypes.PURCHASE_BURGER_SAGA , purchaseBurgerSaga);
}