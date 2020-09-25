import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from './Wrap';
import ToolBar from '../components/navigation/Toolbar';
import SideDrawer from '../components/navigation/SideDrawer';
import classes from '../assets/stylesheets/layout.module.css';

const Layout = props => {
    const [sideDrawer, toggleSidedrawer] = useState(false);

    const handleCloseSideDrawer = () => {
        toggleSidedrawer(false);
    };

    const handleDrawerToggle = () => {
        toggleSidedrawer(true);
    };

    return (
        <Aux>
            <ToolBar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={handleDrawerToggle}
            />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawer}
                closed={handleCloseSideDrawer}
            />
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    );
};

const mapStateToProps = state => {
    return { isAuthenticated: state.auth.token !== null };
};

export default connect(mapStateToProps)(Layout);
