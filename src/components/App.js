import React, { useEffect, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../hocs/Layout';
import BurgerBuilder from '../containers/BurgerBuilder';
import Logout from '../containers/Logout';
import { authCheckState } from '../actions/auth';

const Checkout = React.lazy(() => {
    return import('../containers/Checkout');
});

const Orders = React.lazy(() => {
    return import('../containers/Orders');
});
const Auth = React.lazy(() => {
    return import('../containers/Auth');
});

const App = props => {
    const { authCheckState } = props;

    useEffect(() => {
        authCheckState();
    }, [authCheckState]);

    let routes = (
        <Switch>
            <Route path='/auth' render={props => <Auth {...props} />} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route
                    path='/checkout'
                    render={props => <Checkout {...props} />}
                />
                <Route path='/orders' render={props => <Orders {...props} />} />
                <Route path='/auth' render={props => <Auth {...props} />} />
                <Route path='/logout' component={Logout} />
                <Route path='/' exact component={BurgerBuilder} />
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return { isAuthenticated: auth.token !== null };
};

export default connect(mapStateToProps, { authCheckState })(App);
