import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../components/order/CheckoutSummary';
import ContactData from './ContactData';

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    let checkout = (
        <div
            style={{
                textAlign: 'center',
                fontStyle: 'italic',
                marginTop: '30px',
            }}>
            <h1>Please build a burger first!</h1>
        </div>
    );

    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
        checkout = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    checkoutContinued={checkoutContinuedHandler}
                    checkoutCancelled={checkoutCancelledHandler}
                />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }

    return checkout;
};

const mapStateToProps = ({
    ingredients: { ingredients },
    orders: { purchased },
}) => {
    return { ingredients, purchased };
};

export default connect(mapStateToProps)(Checkout);
