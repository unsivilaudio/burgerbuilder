import React from 'react';

import burgerLogo from '../../assets/img/burger-logo.png';
import classes from '../../assets/stylesheets/logo.module.css';

const logo = props => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt='burger-logo' />
        </div>
    );
};

export default logo;
