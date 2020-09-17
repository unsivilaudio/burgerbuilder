import {
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_SUCCESS,
} from '../actions/types';

import { updateObject } from '../shared/utility';

const _INITIAL_STATE = {
    orders: [],
    loading: false,
    purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    const updateOrders = state.orders.concat(newOrder);
    const updatedState = {
        loading: false,
        purchased: true,
        orders: updateOrders,
    };
    return updateObject(state, updatedState);
};

const fetchOrderSuccess = (state, action) => {
    const updatedState = { orders: action.orders, loading: false };
    return updateObject(state, updatedState);
};

export default (state = _INITIAL_STATE, action) => {
    switch (action.type) {
        case PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        case PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false });
        case FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action);
        case FETCH_ORDERS_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
};
