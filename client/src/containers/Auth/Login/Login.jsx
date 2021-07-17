import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import {initLogin} from '../../../store/actions/index';
import {input_helper as login_inputs_helper} from '../../../helpers/inputs_helper';


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
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation.required}
                    touched={formElement.config.touched}
                    changed={(event) =>
                        setFormIsValid(login_inputs_helper.changedHandler(event, formElement.id, authForm, setAuthForm))
                    }
                />
            ))}
            <Button
                type='Success'
                disabled={!formIsValid}
                clicked={submitHandler}
            >
                Login
            </Button>
        </form>
    );
                    console.log(props)
    if (props.isAuthenticated) {
        return <Redirect to='/Dashboard' />;
    }

    
    return (
        <div className='container'>
            <h1 className='large'>Sign In</h1>
            <p className='lead'>Sign in to your account</p>
            {form}
            <p>
                Don't have an account? <Link to='/Register'>Sign Up</Link>
            </p>
        </div>
    );
};

const mapStateTpProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitLogin: (payload) => dispatch(initLogin(payload)),
    };
};

export default connect(mapStateTpProps, mapDispatchToProps)(Login);
