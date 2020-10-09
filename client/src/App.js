import React, {Fragment, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Landing from './containers/Landing/Landing.js';
import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import './App.css';
import Alert from './components/UI/Alert/Alert';
import setAuthToken from './utils/setAuthToken';
import {initUserLoad} from './store/actions/index';

//redux
import {Provider} from 'react-redux';
import store from './store/store';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        if (localStorage.token) store.dispatch(initUserLoad());
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Layout>
                        <Alert />
                        <Switch>
                            <Route path='/register' component={Register} />
                            <Route path='/login' component={Login} />
                            <Route path='/logout' component={Logout} />
                        </Switch>
                        <Route exact path='/' component={Landing} />
                    </Layout>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
