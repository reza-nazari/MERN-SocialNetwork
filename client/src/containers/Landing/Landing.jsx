import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Landing.module.css';
import Button from '../../components/UI/Button/Button';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/Dashboard" />
    }

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
                        <Link to="/Register">
                            <Button type='Success' >
                                Sign Up
                            </Button>
                        </Link>
                        <Link to="/Login">
                            <Button >Login</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateTpProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateTpProps)(Landing);
