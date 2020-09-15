const { FETCH_ORDERS, SUBMIT_ORDER } = require('../actions/types');

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            const orderList = Object.keys(action.payload).map(id => {
                const { ingredients, price } = action.payload[id];
                return { id, ingredients, price };
            });
            return orderList;
        case SUBMIT_ORDER:
            const orders = state.map(el => el);
            orders.push(action.order);
            return orders;
        default:
            return state;
    }
};
