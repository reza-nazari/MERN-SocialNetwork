import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {initial_logout} from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to='/Login' />;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(initial_logout()),
    };
};

export default connect(null, mapDispatchToProps)(Logout);
