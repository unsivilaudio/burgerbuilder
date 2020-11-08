import axios from '../api/axios-orders';
import { put } from 'redux-saga/effects';

import {
    fetchOrdersFail,
    fetchOrdersStart,
    fetchOrdersSuccess,
    purchaseBurgerFail,
    purchaseBurgerStart,
    purchaseBurgerSuccess,
} from '../actions/order';

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());
    try {
        const response = yield axios.post(
            '/orders.json?auth=' + action.token,
            action.orderData
        );
        yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (err) {
        yield put(purchaseBurgerFail(err));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());
    try {
        const queryParams =
            '?auth=' +
            action.token +
            '&orderBy="userId"&equalTo="' +
            action.userId +
            '"';
        const response = yield axios.get('/orders.json' + queryParams);
        const orders = yield Object.keys(response.data).map(key => {
            return {
                ...response.data[key],
                id: key,
            };
        });
        yield put(fetchOrdersSuccess(orders));
    } catch (err) {
        yield put(fetchOrdersFail());
    }
}
