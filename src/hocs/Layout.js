import React from 'react';

import Aux from './Aux';
import ToolBar from '../components/navigation/Toolbar';
import SideDrawer from '../components/navigation/SideDrawer';
import classes from '../assets/stylesheets/layout.module.css';

class Layout extends React.Component {
    state = { showSideDrawer: false };

    handleCloseSideDrawer = () => {
        this.setState({ showSideDrawer: false });
    };

    handleDrawerToggle = () => {
        this.setState({ showSideDrawer: true });
    };

    render() {
        return (
            <Aux>
                <ToolBar drawerToggleClicked={this.handleDrawerToggle} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.handleCloseSideDrawer}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;
