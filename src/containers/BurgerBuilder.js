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
import { addIngredient, removeIngredient } from '../actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends React.Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        // axios
        //     .get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data });
        //     })
        //     .catch(err => {
        //         this.setState({ error: true });
        //     });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ingredients !== this.props.ingredients) {
            this.updatePurchaseState(this.props.ingredients);
        }
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ing => ingredients[ing])
            .reduce((arr, val) => {
                return arr + val;
            }, 0);

        if (sum === 0) {
            this.setState({ purchasable: false });
        } else {
            this.setState({ purchasable: true });
        }
    }

    addIngredientHandler = type => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.props.ingredients[type];
        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.props.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinued = () => {
        this.props.history.push({
            pathname: '/checkout',
            state: {
                ingredients: this.props.ingredients,
                totalPrice: this.props.totalPrice,
            },
        });
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
                        purchasable={this.state.purchasable}
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

export default connect(mapStateToProps, { addIngredient, removeIngredient })(
    app
);
