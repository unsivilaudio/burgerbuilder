import { combineReducers } from 'redux';
import ingredients from './ingredientReducer';
import orders from './ordersReducer';

export default combineReducers({
    ingredients,
    orders,
});
