import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default Toolbar;
