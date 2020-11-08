import {
    ADD_INGREDIENT,
    FETCH_INGREDIENTS_START,
    REMOVE_INGREDIENT,
} from './types';

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
    dispatch({
        type: FETCH_INGREDIENTS_START,
    });
};
