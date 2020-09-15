import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../components/order/CheckoutSummary';
import ContactData from './ContactData';
import { purchaseInit } from '../actions/order';

class Checkout extends React.Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
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

        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to='/' />
            ) : null;
            checkout = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }

        return checkout;
    }
}

const mapStateToProps = ({
    ingredients: { ingredients },
    orders: { purchased },
}) => {
    return { ingredients, purchased };
};

export default connect(mapStateToProps)(Checkout);
