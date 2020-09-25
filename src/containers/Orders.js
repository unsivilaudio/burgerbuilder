import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../components/order/Order';
import axios from '../api/axios-orders';
import Spinner from '../components/ui/Spinner';
import withErrorHandler from '../hocs/withErrorHandler';
import { fetchOrders } from '../actions/order';

const Orders = props => {
    const { fetchOrders, token, userId } = props;

    useEffect(() => {
        fetchOrders(token, userId);
    }, [fetchOrders, token, userId]);

    const renderOrderList = () => {
        return props.orders.map(order => {
            return (
                <Order
                    key={order.id}
                    price={order.price.toFixed(2)}
                    ingredients={order.ingredients}
                />
            );
        });
    };

    return <div>{props.loading ? <Spinner /> : renderOrderList()}</div>;
};

const mapStateToProps = ({
    orders: { orders, loading },
    auth: { token, userId },
}) => {
    return { orders, loading, token, userId };
};

const app = withErrorHandler(Orders, axios);

export default connect(mapStateToProps, { fetchOrders })(app);
