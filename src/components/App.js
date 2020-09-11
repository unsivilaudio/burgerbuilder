import React from 'react';
import Layout from '../hocs/Layout';
import BurgerBuilder from '../containers/BurgerBuilder';

class App extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}

export default App;
