import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { auth, setAuthRedirectPath } from '../actions/auth';
import { updateObject, checkValidity } from '../shared/utility';

import classes from '../assets/stylesheets/auth.module.css';

class Auth extends React.Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        formIsValid: false,
        isSignup: true,
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath('/');
        }
    }

    validateForm() {
        let formIsValid = false;
        const validInputs = Object.keys(this.state.controls)
            .map(key => {
                if (!this.state.controls[key].validation) return true;
                return this.state.controls[key].valid;
            })
            .every(el => el);
        if (validInputs) {
            formIsValid = true;
        }
        this.setState({ formIsValid });
    }

    handleChange = (e, id) => {
        const { value } = e.target;
        const controls = updateObject(this.state.controls, {
            [id]: {
                ...this.state.controls[id],
                value,
                valid: checkValidity(value, this.state.controls[id].validation),
                touched: true,
            },
        });

        this.validateForm();
        this.setState({ controls });
    };

    handleSubmit = e => {
        e.preventDefault();
        const formType = this.state.isSignup ? 'signUp' : 'signInWithPassword';
        const [email, password] = Object.keys(this.state.controls).map(
            el => this.state.controls[el].value
        );
        this.props.auth(email, password, formType);
    };

    renderInputs = () => {
        return Object.keys(this.state.controls).map(key => {
            let newInput = this.state.controls[key];
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

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    };

    render() {
        let form = (
            <div className={classes.Form}>
                <h2>{this.state.isSignup ? 'Sign Up' : 'Sign In'}</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInputs()}
                    <Button
                        btnType='Success'
                        disabled={!this.state.formIsValid}>
                        Submit
                    </Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
                    <i>
                        Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}?
                    </i>
                </Button>
            </div>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className={classes.error}>
                    {this.props.error.message.replace('_', ' ')}!
                </p>
            );
        }

        if (this.props.isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {form}
            </div>
        );
    }
}

const mapStateToProps = ({ auth, ingredients }) => {
    return {
        loading: auth.loading,
        error: auth.error,
        isAuthenticated: auth.token !== null,
        buildingBurger: ingredients.building,
        authRedirectPath: auth.authRedirectPath,
    };
};

export default connect(mapStateToProps, { auth, setAuthRedirectPath })(Auth);
