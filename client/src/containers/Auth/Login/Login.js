import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import {initLogin} from '../../../store/actions/index';

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email',
            },
            value: '',
            validation: {
                required: true,
                isEmeil: true,
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

    const checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...authForm,
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation,
        );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            isValid = updatedOrderForm[inputIdentifier].valid && isValid;
        }

        setAuthForm({
            ...authForm,
            [inputIdentifier]: updatedOrderForm[inputIdentifier],
        });
        setFormIsValid(isValid);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        let user = {
            email: authForm['email'].value,
            password: authForm['password'].value,
        };

        props.onInitLogin(user);
    };

    const formElementArray = [];
    for (let key in authForm) {
        formElementArray.push({
            id: key,
            config: authForm[key],
        });
    }

    let form = (
        <form action=''>
            {formElementArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={formElement.config.invalid}
                    shouldValidate={formElement.config.shouldValidate}
                    touched={formElement.config.touched}
                    changed={(event) =>
                        inputChangedHandler(event, formElement.id)
                    }
                />
            ))}
            <Button
                type='Success'
                disabled={!formIsValid}
                clicked={submitHandler}
            >
                Register
            </Button>
        </form>
    );

    if (props.isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
    return (
        <div className='container'>
            <h1 className='large'>Sign In</h1>
            <p className='lead'>Sign in to your account</p>
            {form}
            <p>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </div>
    );
};

const mapStateTpProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitLogin: (paylaod) => dispatch(initLogin(paylaod)),
    };
};

export default connect(mapStateTpProps, mapDispatchToProps)(Login);
