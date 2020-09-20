import axios from '../api/axios-orders';
import { put } from 'redux-saga/effects';

import { SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from '../actions/types';

export function* fetchIngredientsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json');

        yield put({
            type: SET_INGREDIENTS,
            payload: response.data,
        });
    } catch (err) {
        yield put({
            type: FETCH_INGREDIENTS_FAILED,
        });
    }
}
