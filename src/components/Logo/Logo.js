import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} >
        <img src={burgerLogo} alt="5 Guys Burgers & Fries"/>
    </div>
);

export default logo;