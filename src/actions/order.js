import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    PURCHASE_BURGER_SUBMIT,
    FETCH_ORDERS_SUBMIT,
} from './types';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData,
    };
};

export const purchaseBurgerFail = error => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData, token) => dispatch => {
    dispatch({
        type: PURCHASE_BURGER_SUBMIT,
        orderData,
        token,
    });
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = orders => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders,
    };
};

export const fetchOrdersFail = error => {
    return {
        type: FETCH_ORDERS_FAIL,
        error,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token, userId) => dispatch => {
    dispatch({
        type: FETCH_ORDERS_SUBMIT,
        token,
        userId,
    });
};
