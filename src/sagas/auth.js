import axios from 'axios';
import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import {
    logout,
    logoutSucceed,
    authStart,
    authSuccess,
    checkAuthTimeout,
    authFail,
} from '../actions/auth';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logout());
}

export function* authUserSaga(action) {
    put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };
    try {
        const response = yield axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:${action.method}?key=AIzaSyCHrjnqpkH989BU3X2IwesRcXWHOCih5Tk`,
            authData
        );

        const { idToken, localId } = response.data;
        const expirationDate = yield new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        );
        yield localStorage.setItem('token', idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', localId);
        yield put(authSuccess(idToken, localId));
        yield put(checkAuthTimeout(response.data.expiresIn));
    } catch (err) {
        yield put(authFail(err.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem('expirationDate')
        );
        if (expirationDate < new Date()) {
            yield put(logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(authSuccess(token, userId));
            yield put(
                checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
}
