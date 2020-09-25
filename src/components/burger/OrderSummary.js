import React from 'react';

import classes from '../../assets/stylesheets/ordersummary.module.css';
import Button from '../ui/Button';

const OrderSummary = props => {
    const ingredientSummary = () =>
        Object.keys(props.ingredients).map(key => {
            return (
                <li key={key}>
                    <span>{key}</span>: <span>{props.ingredients[key]}</span>
                </li>
            );
        });

    return (
        <div className={classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary()}</ul>
            <p>
                <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
            </p>
            <p>Continue to checkout?</p>

            <Button btnType='Danger' clicked={props.purchaseCancelled}>
                Cancel
            </Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>
                Continue
            </Button>
        </div>
    );
};

export default OrderSummary;
