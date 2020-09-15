import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './types';

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
