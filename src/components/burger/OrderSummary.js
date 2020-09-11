import React from 'react';

import classes from '../../assets/stylesheets/ordersummary.module.css';
import Button from '../ui/Button';

class OrderSummary extends React.Component {
    ingredientSummary = () =>
        Object.keys(this.props.ingredients).map(key => {
            return (
                <li key={key}>
                    <span>{key}</span>:{' '}
                    <span>{this.props.ingredients[key]}</span>
                </li>
            );
        });

    render() {
        return (
            <div className={classes.OrderSummary}>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{this.ingredientSummary()}</ul>
                <p>
                    <strong>
                        Total Price: ${this.props.totalPrice.toFixed(2)}
                    </strong>
                </p>
                <p>Continue to checkout?</p>

                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>
                    Cancel
                </Button>
                <Button
                    btnType='Success'
                    clicked={this.props.purchaseContinued}>
                    Continue
                </Button>
            </div>
        );
    }
}

export default OrderSummary;
