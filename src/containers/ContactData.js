import React from 'react';
import { connect } from 'react-redux';

import axios from '../api/axios-orders';
import withErrorHandler from '../hocs/withErrorHandler';
import Button from '../components/ui/Button';
import classes from '../assets/stylesheets/contactdata.module.css';
import Spinner from '../components/ui/Spinner';
import Input from '../components/ui/Input';
import { purchaseBurger } from '../actions/order';

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zipcode',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ],
                },
                value: 'fastest',
            },
        },
        formIsValid: false,
        loading: false,
    };

    checkValidity(value, rules) {
        if (!rules) return true;
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    validateForm() {
        let formIsValid = false;
        const validInputs = Object.keys(this.state.orderForm)
            .map(key => {
                if (!this.state.orderForm[key].validation) return true;
                return this.state.orderForm[key].valid;
            })
            .every(el => el);
        if (validInputs) {
            formIsValid = true;
            this.setState({ formIsValid });
        }
    }

    handleChange = (e, id) => {
        const { value } = e.target;
        let orderForm = {
            ...this.state.orderForm,
            [id]: {
                ...this.state.orderForm[id],
                value,
                valid: this.checkValidity(
                    value,
                    this.state.orderForm[id].validation
                ),
                touched: true,
            },
        };
        this.validateForm();
        this.setState({ orderForm });
    };

    handleSubmit = async e => {
        e.preventDefault();

        const formData = Object.keys(this.state.orderForm).reduce(
            (acc, key) => {
                acc[key] = this.state.orderForm[key].value;
                return acc;
            },
            {}
        );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: { ...formData },
            userId: this.props.userId,
        };

        this.props.purchaseBurger(order, this.props.token);
    };

    renderInputs = () => {
        return Object.keys(this.state.orderForm).map(key => {
            let newInput = this.state.orderForm[key];
            return (
                <Input
                    key={key}
                    label={key}
                    elementType={newInput.elementType}
                    elementConfig={newInput.elementConfig}
                    value={newInput.value}
                    invalid={!newInput.valid}
                    shouldValidate={newInput.validation}
                    touched={newInput.touched}
                    handleChange={e => this.handleChange(e, key)}
                />
            );
        });
    };

    render() {
        let form = (
            <form onSubmit={this.handleSubmit}>
                {this.renderInputs()}
                <div className={classes.CTA}>
                    <Button
                        btnType='Success'
                        clicked={this.handleSubmit}
                        disabled={!this.state.formIsValid}>
                        Order Now
                    </Button>
                </div>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = ({
    ingredients: { ingredients, totalPrice },
    orders: { loading },
    auth: { token, userId },
}) => {
    return { ingredients, totalPrice, loading, token, userId };
};

const app = withErrorHandler(ContactData, axios);

export default connect(mapStateToProps, { purchaseBurger })(app);
