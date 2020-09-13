import React, { Component } from 'react';

import Order from '../components/order/Order';
import axios from '../api/axios-orders';
import Spinner from '../components/ui/Spinner';
import withErrorHandler from '../hocs/withErrorHandler';

class Orders extends Component {
    state = { orders: [], loading: true };

    componentDidMount() {
        axios
            .get('/orders.json')
            .then(res => {
                const orders = Object.keys(res.data).map(key => {
                    const { ingredients, price } = res.data[key];
                    return { key, ingredients, price };
                });
                this.setState({ loading: false, orders });
            })
            .catch(res => {
                this.setState({ loading: false });
            });
    }

    renderOrderList = () => {
        return this.state.orders.map(order => {
            return (
                <Order
                    key={order.key}
                    price={order.price.toFixed(2)}
                    ingredients={order.ingredients}
                />
            );
        });
    };

    render() {
        return (
            <div>
                {this.state.loading ? <Spinner /> : this.renderOrderList()}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
