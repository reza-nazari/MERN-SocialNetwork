import React from 'react';

import LogoImage from '../../assets/img/icon.png';
import classes from './Logo.module.css';

const Logo = () => (
    <div className={classes.Logo}>
        <img src={LogoImage} alt='logo' />
    </div>
);

export default Logo;
