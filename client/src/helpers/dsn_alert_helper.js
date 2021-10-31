import store from '../store/store';
import { setAlert } from '../store/actions/index';

const dsn_alert_helper = (() => {

    const notification_type_enum = {
        "DANGER": "danger",
        "SUCCESS": "success"
    };

    function get_notification_type(type) {
        switch (type) {
            case notification_type_enum.DANGER:
                return notification_type_enum.DANGER;
            case notification_type_enum.SUCCESS:
                return notification_type_enum.SUCCESS;
            default:
                return notification_type_enum.DANGER;
        }
    }

    /**
     * 
     * @param {Array.<String>} messages 
     * @param {string} type 
     */
    function alert_dialog(messages, type) {
        messages.array.forEach(msg => show_notification(msg, get_notification_type(type)));
                
    }

    function show_notification(message, type) {
        store.dispatch(setAlert(message, type))
    }

    function api_error(error) {
        let type = notification_type(error.type);

        if(!error) 
            return;

        let messages = mapErrorMessages(error);

        alert_dialog(messages, type);

    }

    function mapErrorMessages(error){
        let output = [];

        if(!error)
            return[];

        if(Array.isArray(error))
            return error;

        output.push(error.data.errors);

        return output;
    }

    function notification_type(statusCode) {
        switch (statusCode) {
            case 400:
            case 401:
            case 404:
            case 500:
                return notification_type_enum.DANGER;
            case 200:
                return notification_type_enum.SUCCESS;
            default:
                return notification_type_enum.DANGER;
        }
    }

    return {
        alert_dialog
    }


})();

export default dsn_alert_helper;