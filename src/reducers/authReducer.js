import {
    AUTH_FAIL,
    AUTH_LOGOUT,
    AUTH_START,
    AUTH_SUCCESS,
    SET_AUTH_REDIRECT_PATH,
} from '../actions/types';

import { updateObject } from '../shared/utility';

const _INITIAL_STATE = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path,
    });
};

export default (state = _INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_START:
            return updateObject(state, { error: null, loading: true });
        case AUTH_SUCCESS:
            return authSuccess(state, action);
        case AUTH_FAIL:
            return authFail(state, action);
        case AUTH_LOGOUT:
            return authLogout(state, action);
        case SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};
