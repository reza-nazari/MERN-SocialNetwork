import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar isAuthenticated={props.isAuthenticated}/>
            <main>{props.children}</main>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps)(Layout);
