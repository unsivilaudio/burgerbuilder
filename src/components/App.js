import React from 'react';
import { Route } from 'react-router-dom';

import Layout from '../hocs/Layout';
import BurgerBuilder from '../containers/BurgerBuilder';
import Checkout from '../containers/Checkout';
import Orders from '../containers/Orders';

class App extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route exact path='/' component={BurgerBuilder} />
                    <Route exact path='/orders' component={Orders} />
                    <Route path='/checkout' component={Checkout} />
                </Layout>
            </div>
        );
    }
}

export default App;
