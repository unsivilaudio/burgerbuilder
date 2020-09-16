import axios from 'axios';

import {
    AUTH_START,
    AUTH_FAIL,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT_PATH,
} from './types';

export const authStart = () => {
    return {
        type: AUTH_START,
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken,
        userId,
    };
};

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = expirationTime => dispatch => {
    return setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
};

export const auth = (email, password, method) => dispatch => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    axios
        .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyCHrjnqpkH989BU3X2IwesRcXWHOCih5Tk`,
            authData
        )
        .then(res => {
            const { idToken, localId } = res.data;
            const expirationDate = new Date(
                new Date().getTime() + res.data.expiresIn * 1000
            );
            localStorage.setItem('token', idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', localId);
            dispatch(authSuccess(idToken, localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
};

export const setAuthRedirectPath = path => dispatch => {
    dispatch({
        type: SET_AUTH_REDIRECT_PATH,
        path,
    });
};

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate < new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(
                checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
};
