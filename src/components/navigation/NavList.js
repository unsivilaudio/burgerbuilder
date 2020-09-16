import React from 'react';

import classes from '../../assets/stylesheets/navlist.module.css';
import NavItem from './NavItem';

const navList = props => {
    return (
        <ul className={classes.NavList}>
            <NavItem link='/'>Burger Builder</NavItem>
            {props.isAuthenticated ? (
                <NavItem link='/orders'>Orders</NavItem>
            ) : null}
            {!props.isAuthenticated ? (
                <NavItem link='/auth'>Authenticate</NavItem>
            ) : (
                <NavItem link='/logout'>Logout</NavItem>
            )}
        </ul>
    );
};

export default navList;
