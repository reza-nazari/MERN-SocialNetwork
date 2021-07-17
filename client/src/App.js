import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import routes from './config/routes';
import setAuthToken from './config/setAuthToken';
import { initUserLoad } from './store/actions/index';
import Alert from './components/UI/Alert/Alert';
import Layout from './containers/Layout/Layout';
import PrivateRoute from './components/Route/PrivateRoute';
import PublicRoute from './components/Route/PublicRoute';
import './App.css';

//redux
import { Provider } from 'react-redux';
import store from './store/store';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        if (localStorage.token){
            store.dispatch(initUserLoad());
        }
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Layout>
                        <Alert />
                        <Switch>
                            {routes.map((route) => (
                                route.isPrivate ?
                                    <PrivateRoute
                                        key={route.path}
                                        path={route.path}
                                        component={route.component}
                                        exact
                                    /> :
                                    <PublicRoute
                                        key={route.path}
                                        path={route.path}
                                        component={route.component}
                                        exact
                                    />

                            ))}
                        </Switch>

                    </Layout>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
