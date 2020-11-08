import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { auth, setAuthRedirectPath } from '../actions/auth';
import { updateObject, checkValidity } from '../shared/utility';

import classes from '../assets/stylesheets/auth.module.css';

const Auth = props => {
    const [controls, setControls] = useState({
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
    });

    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const { buildingBurger, authRedirectPath, setAuthRedirectPath } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            setAuthRedirectPath('/');
        }
    }, [buildingBurger, authRedirectPath, setAuthRedirectPath]);

    const validateForm = () => {
        const validInputs = Object.keys(controls)
            .map(key => {
                if (!controls[key].validation) return true;
                return controls[key].valid;
            })
            .every(el => el);
        if (validInputs) {
            setFormIsValid(true);
        }
    };

    const handleChange = (e, id) => {
        const { value } = e.target;
        const updatedControls = updateObject(controls, {
            [id]: {
                ...controls[id],
                value,
                valid: checkValidity(value, controls[id].validation),
                touched: true,
            },
        });

        validateForm();
        setControls(updatedControls);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const formType = isSignup ? 'signUp' : 'signInWithPassword';
        const [email, password] = Object.keys(controls).map(
            el => controls[el].value
        );
        props.auth(email, password, formType);
    };

    const renderInputs = () => {
        return Object.keys(controls).map(key => {
            let newInput = controls[key];
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

    const switchAuthModeHandler = () => {
        setIsSignUp(prevState => !prevState);
    };

    let form = (
        <div className={classes.Form}>
            <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit}>
                {renderInputs()}
                <Button btnType='Success' disabled={!formIsValid}>
                    Submit
                </Button>
            </form>
            <Button btnType='Danger' clicked={switchAuthModeHandler}>
                <i>Switch to {isSignup ? 'Sign In' : 'Sign Up'}?</i>
            </Button>
        </div>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p className={classes.error}>
                {props.error.message.replace('_', ' ')}!
            </p>
        );
    }

    if (props.isAuthenticated) {
        return <Redirect to={props.authRedirectPath} />;
    }

    return (
        <div className={classes.Auth}>
            {errorMessage}
            {form}
        </div>
    );
};

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
