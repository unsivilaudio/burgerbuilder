import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
} from '../actions/types';

const _INITIAL_STATE = {
    ingredients: {},
    totalPrice: 4,
};

const _INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

export default (state = _INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1,
                },
                totalPrice:
                    state.totalPrice +
                    _INGREDIENT_PRICES[action.ingredientName],
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1,
                },
                totalPrice:
                    state.totalPrice -
                    _INGREDIENT_PRICES[action.ingredientName],
            };
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
            };
        default:
            return state;
    }
};
