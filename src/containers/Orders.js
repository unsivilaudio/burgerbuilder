import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../components/order/Order';
import axios from '../api/axios-orders';
import Spinner from '../components/ui/Spinner';
import withErrorHandler from '../hocs/withErrorHandler';
import { fetchOrders } from '../actions/order';

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    renderOrderList = () => {
        return this.props.orders.map(order => {
            return (
                <Order
                    key={order.id}
                    price={order.price.toFixed(2)}
                    ingredients={order.ingredients}
                />
            );
        });
    };

    render() {
        return (
            <div>
                {this.props.loading ? <Spinner /> : this.renderOrderList()}
            </div>
        );
    }
}

const mapStateToProps = ({ orders: { orders, loading } }) => {
    return { orders, loading };
};

const app = withErrorHandler(Orders, axios);

export default connect(mapStateToProps, { fetchOrders })(app);
