import React from 'react';
import { connect } from 'react-redux';

import classes from './Alert.module.css';

const Alert = ({ alerts }) => {
    console.log(alerts)
    return alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div
                key={alert.id}
                className={[classes.alert, classes[alert.alertType]].join(' ')}
            >
                {alert.msg}
            </div>
        ));
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alert,
    };
};

export default connect(mapStateToProps)(Alert);
