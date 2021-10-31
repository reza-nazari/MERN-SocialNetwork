import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Spinner from '../../components/UI/Spinner/Spinner';
const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar isAuthenticated={props.isAuthenticated}/>
            {props.isLoading ? <Spinner /> : null}
            <main>{props.children}</main>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.loading.isLoading
    };
}

export default connect(mapStateToProps)(Layout);
