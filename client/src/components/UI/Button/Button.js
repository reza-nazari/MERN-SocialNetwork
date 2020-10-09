import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
    const color = [classes.Button, classes[props.type]].join(' ');

    return (
        <button className={color} onClick={props.clicked} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default Button;
