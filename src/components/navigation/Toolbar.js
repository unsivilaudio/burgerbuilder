import React from 'react';

import classes from '../../assets/stylesheets/toolbar.module.css';
import Logo from './Logo';
import NavList from './NavList';
import DrawerToggle from './DrawerToggle';

const toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavList />
            </nav>
        </header>
    );
};

export default toolbar;
