import React from 'react';
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

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.getIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ing => ingredients[ing])
            .reduce((arr, val) => {
                return arr + val;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinued = () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinued}
            />
        );

        let burger = this.props.error ? (
            <p>Ingredients can't be loaded</p>
        ) : (
            <Spinner />
        );

        if (Object.keys(this.props.ingredients).length > 0) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(
                            this.props.ingredients
                        )}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.totalPrice}
                    />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

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
