import React from 'react';
import {useHistory} from 'react-router-dom';

import classes from './Landing.module.css';
import Button from '../../components/UI/Button/Button';

const Landing = (props) => {
    const history = useHistory();

    const registerHandler = () => history.push('/register');
    const loginHandler = () => history.push('/login');

    return (
        <section className={classes.Landing}>
            <div className={classes.dark_overlay}>
                <div className={classes.LandingInner}>
                    <h1 className='x-large'>
                        Welcome to developers social network
                    </h1>
                    <p className='lead'>
                        Create profile, share posts and get help from other
                        developers
                    </p>
                    <div className='buttons'>
                        <Button type='Success' clicked={registerHandler}>
                            Sign Up
                        </Button>
                        <Button clicked={loginHandler}>Login</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
