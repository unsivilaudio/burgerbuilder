import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../components/order/Order';
import axios from '../api/axios-orders';
import Spinner from '../components/ui/Spinner';
import withErrorHandler from '../hocs/withErrorHandler';
import { fetchOrders } from '../actions';

class Orders extends Component {
    state = { loading: true };

    componentDidMount() {
        this.getOrders();
    }

    getOrders = async () => {
        try {
            await this.props.fetchOrders();
        } catch (err) {
            console.log(err);
        }
        this.setState({ loading: false });
    };

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
                {this.state.loading ? <Spinner /> : this.renderOrderList()}
            </div>
        );
    }
}

const mapStateToProps = ({ orders }) => {
    return { orders };
};

const app = withErrorHandler(Orders, axios);

export default connect(mapStateToProps, { fetchOrders })(app);
