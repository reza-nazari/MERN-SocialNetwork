import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/developers' active exact>
            Developers
        </NavigationItem>
        {props.isAuthenticated ? null : (
            <NavigationItem link='/register'>Register</NavigationItem>
        )}

        {props.isAuthenticated ? (
            <NavigationItem link='/logout'>Logout</NavigationItem>
        ) : (
            <NavigationItem link='/login'>Login</NavigationItem>
        )}
    </ul>
);

export default NavigationItems;
