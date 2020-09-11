import React from 'react';

import classes from '../../assets/stylesheets/navitem.module.css';

const navItem = props => {
    return (
        <li className={classes.NavItem}>
            <a
                href={props.link}
                className={props.active ? classes.active : null}>
                {props.children}
            </a>
        </li>
    );
};

export default navItem;