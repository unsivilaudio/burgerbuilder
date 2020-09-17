import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from '../hocs/asyncComponent';
import Layout from '../hocs/Layout';
import BurgerBuilder from '../containers/BurgerBuilder';
import Logout from '../containers/Logout';
import { authCheckState } from '../actions/auth';

const asyncCheckout = asyncComponent(() => {
    return import('../containers/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('../containers/Orders');
});
const asyncAuth = asyncComponent(() => {
    return import('../containers/Auth');
});

class App extends React.Component {
    componentDidMount() {
        this.props.authCheckState();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={asyncAuth} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckout} />
                    <Route path='/orders' component={asyncOrders} />
                    <Route path='/auth' component={asyncAuth} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { isAuthenticated: auth.token !== null };
};

export default connect(mapStateToProps, { authCheckState })(App);
