import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    
    if(props.touched && props.shouldValidate && props.invalid){
        inputClasses.push(classes.Invalid);
    }
    
    switch (props.elementType) {
        case 'input':
            inputElement = (
                <div>
                    <input
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                        required={props.shouldValidate}
                    /><small> {props.text} </small>
                </div>

            );
            break;
        case 'textarea':
            inputElement = (
                <div>
                    <textarea
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    /><small> {props.text} </small>
                </div>

            );
            break;
        case 'select':
            inputElement = (
                <div>
                    <select
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        onChange={props.changed}
                    >
                        {props.elementConfig.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select><small> {props.text} </small>
                </div>

            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
