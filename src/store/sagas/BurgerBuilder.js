import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* initIngredientSaga(action) {
    try {
        const url = "https://react-my-burger-dd8a1.firebaseio.com/ingredients.json";
        const response = yield axios.get(url);
        yield put(actions.setIngredients(response.data));
    }
    catch(error) {
        yield put(actions.fetchIngredientsFailed());
    }
}