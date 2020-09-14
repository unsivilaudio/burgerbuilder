import React from 'react';

import axios from '../api/axios-orders';
import Button from '../components/ui/Button';
import classes from '../assets/stylesheets/contactdata.module.css';
import Spinner from '../components/ui/Spinner';
import Input from '../components/ui/Input';

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
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',
                },
                value: '',
            },
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zipcode',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country',
                },
                value: 'USA',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail',
                },
                value: '',
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
        loading: false,
    };

    handleChange = (e, id) => {
        let orderForm = { ...this.state.orderForm };
        orderForm[id].value = e.target.value;
        this.setState({ orderForm });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        const submittedOrder = Object.keys(this.state.orderForm).reduce(
            (acc, key) => {
                acc[key] = this.state.orderForm[key].value;
                return acc;
            },
            {}
        );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            ...submittedOrder,
        };
        axios
            .post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
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
                    <Button btnType='Success' clicked={this.handleSubmit}>
                        Order Now
                    </Button>
                </div>
            </form>
        );

        if (this.state.loading) {
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

export default ContactData;
