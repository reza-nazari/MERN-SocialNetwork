import { API } from '../../config/axios';

const sn_v1_profile_repo = (() => {
    return {
        get: get_profile,
        post: post_profile
    };

    async function get_profile() {
        try {
            const response = await API({
                type: 'get',
                url: 'api/profile/me'
            });

            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function post_profile(model){
        try {
            const response = await API({
                type: 'post',
                url: 'api/profile',
                data: model
            });

            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
})();

export default sn_v1_profile_repo;