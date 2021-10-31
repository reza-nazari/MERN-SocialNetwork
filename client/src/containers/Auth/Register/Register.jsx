import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { setAlert } from '../../../store/actions/index';
import { initRegister, loading_on, loading_off } from '../../../store/actions/index';

import {input_helper as register_inputs_helper} from '../../../helpers/inputs_helper';


const Register = (props) => {
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

    const submitHandler = async (e) => {
        e.preventDefault();

        props.loading_on();

        let newUser = {
            name: authForm['name'].value,
            email: authForm['email'].value,
            password: authForm['password'].value,
        };

        await props.onInitRegister(newUser);
        props.loading_off();
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
                        setFormIsValid(register_inputs_helper.changedHandler(event, formElement.id, authForm, setAuthForm))
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
            {props.loading ? <Spinner /> : null}
        </div>
    );
};

const mapStateTpProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.loading.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetAlert: (msg, type) => dispatch(setAlert(msg, type)),
        onInitRegister: (payload) => dispatch(initRegister(payload)),
        loading_on: () => dispatch(loading_on()),
        loading_off: () => dispatch(loading_off())
    };
};

export default connect(mapStateTpProps, mapDispatchToProps)(Register);
