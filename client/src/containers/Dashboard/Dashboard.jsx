import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../store/actions/profile';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return (
        <div className="container">
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>
            {profile ?
                (<Fragment>has</Fragment>) :
                (<Fragment>
                    <p>You have not yet setup a profile, pleas add some info</p>
                    <Link to="create-profile">
                        <Button type='Success' >
                            Create Profile
                        </Button>
                    </Link>
                </Fragment>)

            }
        </div>
    )
}

const mapStateTpProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}

export default connect(mapStateTpProps, { getCurrentProfile })(Dashboard)
