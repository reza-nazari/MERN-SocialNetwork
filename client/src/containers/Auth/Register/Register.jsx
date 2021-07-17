import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import {setAlert} from '../../../store/actions/index';
import {initRegister} from '../../../store/actions/index';

const Register = (props) => {
    // const [isSignUp, setIsSignUp] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [authForm, setAuthForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name',
            },
            value: '',
            validation: {
                required: true,
                minLength: 1,
                maxLength: 15,
            },
            valid: false,
            touched: false,
        },
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
        confirmPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                isMatch: true,
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

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isMatch) {
            const password = authForm.password.value;
            const confirmPassword = value;

            isValid = password === confirmPassword;
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

        let newUser = {
            name: authForm['name'].value,
            email: authForm['email'].value,
            password: authForm['password'].value,
        };

        props.onInitRegister(newUser);
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
        return <Redirect to='/Dashboard' />;
    }

    return (
        <div className='container'>
            <h1 className='large'>Sign Up</h1>
            <p className='lead'>Create your account</p>
            {form}
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
        onSetAlert: (msg, type) => dispatch(setAlert(msg, type)),
        onInitRegister: (payload) => dispatch(initRegister(payload)),
    };
};

export default connect(mapStateTpProps, mapDispatchToProps)(Register);
