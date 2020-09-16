import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
} from '../actions/types';

import { updateObject } from './utility';

const _INITIAL_STATE = {
    ingredients: {},
    totalPrice: 4,
    error: false,
    building: false,
};

const _INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    };
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice:
            state.totalPrice + _INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    };
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice:
            state.totalPrice + _INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, action.payload);
    const updatedState = {
        error: false,
        totalPrice: 4,
        ingredients: updatedIngredients,
        building: false,
    };
    return updateObject(state, updatedState);
};

export default (state = _INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return addIngredient(state, action);
        case REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case SET_INGREDIENTS:
            return setIngredients(state, action);
        case FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};
