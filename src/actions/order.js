import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
} from './types';
import axios from '../api/axios-orders';

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
    dispatch(purchaseBurgerStart());
    axios
        .post('/orders.json?auth=' + token, orderData)
        .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData));
        })
        .catch(err => {
            dispatch(purchaseBurgerFail(err));
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
    dispatch(fetchOrdersStart());
    const queryParams =
        '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
        .get('/orders.json' + queryParams)
        .then(res => {
            const orders = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key,
                };
            });
            dispatch(fetchOrdersSuccess(orders));
        })
        .catch(err => {
            dispatch(fetchOrdersFail());
        });
};
