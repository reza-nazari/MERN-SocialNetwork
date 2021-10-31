import React, { Fragment } from 'react'
import spinner from '../../../assets/spinner.gif';
import classes from './Spinner.module.css';

export default () => (
    <Fragment>
        <div className={classes.backdrop}>
            <img src={spinner} alt="Loading..." className={classes.spinner} />
        </div>
    </Fragment>
);

