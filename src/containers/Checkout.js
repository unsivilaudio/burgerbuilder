import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../components/order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends React.Component {
    state = {
        loading: false,
    };

    componentDidMount() {
        this.setState({ ...this.state, ...this.props.location.state });
    }

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

        if (this.state.ingredients) {
            console.log(this.state);
            checkout = (
                <div>
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        render={props => (
                            <ContactData
                                ingredients={this.state.ingredients}
                                price={this.state.totalPrice}
                                {...props}
                            />
                        )}
                    />
                </div>
            );
        }

        return checkout;
    }
}

export default Checkout;
