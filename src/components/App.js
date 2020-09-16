import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../hocs/Layout';
import BurgerBuilder from '../containers/BurgerBuilder';
import Checkout from '../containers/Checkout';
import Orders from '../containers/Orders';
import Auth from '../containers/Auth';
import Logout from '../containers/Logout';
import { authCheckState } from '../actions/auth';

class App extends React.Component {
    componentDidMount() {
        this.props.authCheckState();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
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
