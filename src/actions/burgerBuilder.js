import {
    ADD_INGREDIENT,
    FETCH_INGREDIENTS_FAILED,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
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
        .catch(err => {
            dispatch({
                type: FETCH_INGREDIENTS_FAILED,
            });
        });
};
