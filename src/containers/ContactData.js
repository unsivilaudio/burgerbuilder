import React from 'react';

import axios from '../api/axios-orders';
import Button from '../components/ui/Button';
import classes from '../assets/stylesheets/contactdata.module.css';
import Spinner from '../components/ui/Spinner';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: '',
        },
        loading: false,
    };

    handleChange = e => {
        if (e.target.name.split('.').length > 1) {
            const [parentEl, childEl] = e.target.name.split('.');
            return this.setState({
                [parentEl]: {
                    ...this.state.address,
                    [childEl]: e.target.value,
                },
            });
        }
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        const { name, address, email } = this.state;
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name,
                address,
                email,
            },
            deliveryMethod: 'fastest',
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

    render() {
        let form = (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder='Your name'
                />
                <input
                    type='email'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder='Your email'
                />
                <input
                    type='text'
                    name='address.street'
                    value={this.state.address.street}
                    onChange={this.handleChange}
                    placeholder='Your street'
                />
                <input
                    type='text'
                    name='address.postCode'
                    value={this.state.address.postCode}
                    onChange={this.handleChange}
                    placeholder='Your postcode'
                />
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
