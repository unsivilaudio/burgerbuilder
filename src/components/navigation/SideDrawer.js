import React from 'react';

import Logo from './Logo';
import NavList from './NavList';
import Backdrop from '../ui/BackDrop';
import Aux from '../../hocs/Aux';

import classes from '../../assets/stylesheets/sidedrawer.module.css';

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavList />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;