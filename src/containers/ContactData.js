import React, { useState } from 'react';
import { connect } from 'react-redux';

import axios from '../api/axios-orders';
import withErrorHandler from '../hocs/withErrorHandler';
import Button from '../components/ui/Button';
import classes from '../assets/stylesheets/contactdata.module.css';
import Input from '../components/ui/Input';
import { purchaseBurger } from '../actions/order';
import { updateObject, checkValidity } from '../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
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
                isEmail: true,
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
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const validateForm = () => {
        const validInputs = Object.keys(orderForm)
            .map(key => {
                if (!orderForm[key].validation) return true;
                return orderForm[key].valid;
            })
            .every(el => el);
        if (validInputs) {
            setFormIsValid(true);
        }
    };

    const handleChange = (e, id) => {
        const { value } = e.target;
        const updateFormField = updateObject(orderForm[id], {
            value,
            touched: true,
            valid: checkValidity(value, orderForm[id].validation),
        });
        const updatedOrderForm = updateObject(orderForm, {
            [id]: updateFormField,
        });

        validateForm();
        setOrderForm(updatedOrderForm);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = Object.keys(orderForm).reduce((acc, key) => {
            acc[key] = orderForm[key].value;
            return acc;
        }, {});
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: { ...formData },
            userId: props.userId,
        };

        props.purchaseBurger(order, props.token);
    };

    const renderInputs = () => {
        return Object.keys(orderForm).map(key => {
            let newInput = orderForm[key];
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
                    handleChange={e => handleChange(e, key)}
                />
            );
        });
    };

    let form = (
        <form onSubmit={handleSubmit}>
            {renderInputs()}
            <div className={classes.CTA}>
                <Button
                    btnType='Success'
                    clicked={handleSubmit}
                    disabled={!formIsValid}>
                    Order Now
                </Button>
            </div>
        </form>
    );

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = ({
    ingredients: { ingredients, totalPrice },
    orders: { loading },
    auth: { token, userId },
}) => {
    return { ingredients, totalPrice, loading, token, userId };
};

const app = withErrorHandler(ContactData, axios);

export default connect(mapStateToProps, { purchaseBurger })(app);
