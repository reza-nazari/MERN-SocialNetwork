
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            props.isAuthenticated ?
                <Redirect to="/Dashboard" />
                : <Component {...props} />
        )} />
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps)(PublicRoute);