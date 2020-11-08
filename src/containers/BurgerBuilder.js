import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../api/axios-orders';

import Aux from '../hocs/Wrap';
import Burger from '../components/burger/Burger';
import BuildControls from '../components/burger/BuildControls';
import Modal from '../components/ui/Modal';
import OrderSummary from '../components/burger/OrderSummary';
import Spinner from '../components/ui/Spinner';
import withErrorHandler from '../hocs/withErrorHandler';
import {
    addIngredient,
    removeIngredient,
    getIngredients,
} from '../actions/burgerBuilder';
import { setAuthRedirectPath } from '../actions/auth';
import { purchaseInit } from '../actions/order';

export const BurgerBuilder = props => {
    const { getIngredients } = props;
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        getIngredients();
    }, [getIngredients]);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(ing => ingredients[ing])
            .reduce((arr, val) => {
                return arr + val;
            }, 0);

        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.setAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinued = () => {
        props.purchaseInit();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...props.ingredients,
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] === 0;
    }

    let orderSummary = (
        <OrderSummary
            ingredients={props.ingredients}
            totalPrice={props.totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinued}
        />
    );

    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (Object.keys(props.ingredients).length > 0) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    ingredientAdded={props.addIngredient}
                    ingredientRemoved={props.removeIngredient}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ingredients)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    price={props.totalPrice}
                />
            </Aux>
        );
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

const mapStateToProps = ({
    ingredients: { ingredients, totalPrice, error },
    auth: { token },
}) => {
    return { ingredients, totalPrice, error, isAuthenticated: token !== null };
};

const app = withErrorHandler(BurgerBuilder, axios);

export default connect(mapStateToProps, {
    addIngredient,
    removeIngredient,
    getIngredients,
    purchaseInit,
    setAuthRedirectPath,
})(app);
