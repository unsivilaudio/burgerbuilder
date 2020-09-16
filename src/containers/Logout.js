import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../actions/auth';

class Logout extends React.Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Redirect to='/' />;
    }
}

export default connect(null, { logout })(Logout);
