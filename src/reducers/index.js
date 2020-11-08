import { combineReducers } from 'redux';
import ingredients from './ingredientReducer';
import orders from './ordersReducer';
import auth from './authReducer';

export default combineReducers({
    ingredients,
    orders,
    auth,
});
