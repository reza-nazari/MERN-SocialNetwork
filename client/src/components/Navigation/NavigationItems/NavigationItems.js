import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLink = (
        <NavigationItem link='/Logout'>Logout</NavigationItem>
    );

    const guestLink = (
        <Fragment>
            <NavigationItem link='/Register' exact>Register</NavigationItem>
            <NavigationItem link='/Login' >Login</NavigationItem>
        </Fragment>
    )
     
    return (
        <ul className={classes.NavigationItems}>
            {isAuthenticated ? authLink : guestLink}
        </ul>
    )
};

const mapStateTpProps = state => ({
    auth: state.auth
})

export default connect(mapStateTpProps)(NavigationItems);
