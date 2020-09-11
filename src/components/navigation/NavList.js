import React from 'react';

import classes from '../../assets/stylesheets/navlist.module.css';
import NavItem from './NavItem';

const navList = props => {
    return (
        <ul className={classes.NavList}>
            <NavItem link='/' active>
                Burger Builder
            </NavItem>
            <NavItem link='/'>Checkout</NavItem>
        </ul>
    );
};

export default navList;
