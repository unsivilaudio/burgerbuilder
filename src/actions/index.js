import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_ORDERS,
    SUBMIT_ORDER,
} from './types';
import axios from '../api/axios-orders';

export const addIngredient = ingredientName => dispatch => {
    dispatch({
        type: ADD_INGREDIENT,
        ingredientName,
    });
};

export const removeIngredient = ingredientName => dispatch => {
    dispatch({
        type: REMOVE_INGREDIENT,
        ingredientName,
    });
};

export const getIngredients = () => dispatch => {
    axios
        .get('/ingredients.json')
        .then(res => {
            dispatch({
                type: SET_INGREDIENTS,
                payload: res.data,
            });
        })
        .catch(err => {});
};

export const fetchOrders = () => dispatch => {
    axios
        .get('/orders.json')
        .then(res => {
            dispatch({
                type: FETCH_ORDERS,
                payload: res.data,
            });
        })
        .catch(err => err.message);
};

export const submitOrder = order => dispatch => {
    axios
        .post('/orders.json', order)
        .then(res => {
            dispatch({
                type: SUBMIT_ORDER,
                order,
            });
        })
        .catch(err => {
            return err.message;
        });
};
