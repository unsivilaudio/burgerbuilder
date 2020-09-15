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
import { addIngredient, removeIngredient, getIngredients } from '../actions';

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
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
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinued = () => {
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

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = this.state.error ? (
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
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(
                            this.props.ingredients
                        )}
                        ordered={this.purchaseHandler}
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

const mapStateToProps = ({ ingredients: { ingredients, totalPrice } }) => {
    return { ingredients, totalPrice };
};

const app = withErrorHandler(BurgerBuilder, axios);

export default connect(mapStateToProps, {
    addIngredient,
    removeIngredient,
    getIngredients,
})(app);
