import {
    AUTH_START,
    AUTH_FAIL,
    AUTH_SUCCESS,
    SET_AUTH_REDIRECT_PATH,
    AUTH_INITIATE_LOGOUT,
    AUTH_LOGOUT,
    AUTH_CHECK_TIMEOUT,
    AUTH_USER,
    AUTH_CHECK_STATE,
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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: AUTH_INITIATE_LOGOUT,
    };
};

export const logoutSucceed = () => {
    return {
        type: AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = expirationTime => dispatch => {
    dispatch({
        type: AUTH_CHECK_TIMEOUT,
        expirationTime,
    });
};

export const auth = (email, password, method) => dispatch => {
    dispatch({
        type: AUTH_USER,
        email,
        password,
        method,
    });
};

export const setAuthRedirectPath = path => dispatch => {
    dispatch({
        type: SET_AUTH_REDIRECT_PATH,
        path,
    });
};

export const authCheckState = () => dispatch => {
    dispatch({
        type: AUTH_CHECK_STATE,
    });
};
