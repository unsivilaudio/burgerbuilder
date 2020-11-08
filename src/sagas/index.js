import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import {
    AUTH_CHECK_STATE,
    AUTH_CHECK_TIMEOUT,
    AUTH_INITIATE_LOGOUT,
    AUTH_USER,
    FETCH_INGREDIENTS_START,
    FETCH_ORDERS_SUBMIT,
    PURCHASE_BURGER_SUBMIT,
} from '../actions/types';
import {
    authCheckStateSaga,
    authUserSaga,
    checkAuthTimeoutSaga,
    logoutSaga,
} from './auth';
import { fetchIngredientsSaga } from './burger';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order';

export function* watchAuth() {
    yield all([
        takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(AUTH_USER, authUserSaga),
        takeEvery(AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
}

export function* watchBurger() {
    yield takeEvery(FETCH_INGREDIENTS_START, fetchIngredientsSaga);
}

export function* watchOrders() {
    yield takeEvery(FETCH_ORDERS_SUBMIT, fetchOrdersSaga);
    yield takeLatest(PURCHASE_BURGER_SUBMIT, purchaseBurgerSaga);
}
