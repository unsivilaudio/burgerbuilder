import React from 'react';

import Aux from '../hocs/Aux';
import Toolbar from './navigation/Toolbar';
import SideDrawer from './navigation/SideDrawer';

import classes from '../assets/stylesheets/layout.module.css';

class Layout extends React.Component {
    state = { showSideDrawer: true };

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;
