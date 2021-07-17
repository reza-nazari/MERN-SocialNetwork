import { API } from '../../config/axios';

const sn_v1_account_repo = (() => {

    return {
        register,
        login,
        getUser
    };

    /**
     * 
     * @param {string} model.name 
     * @param {string} model.email 
     * @param {string} model.password 
     * @returns {token | error[]}
     */
    async function register(model) {
        try {
            const response = await API({
                method: 'post',
                url: 'api/users',
                data: model
            });

            return response;

        } catch (error) {
            return Promise.reject(error);
        }

    }

    /**
     * 
     * @param {string} model.email 
     * @param {string} model.password 
     */
    async function login(model) {
        try {
            const response = await API({
                method: 'post',
                url: 'api/auth',
                data: model
            });

            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function getUser(){
        try {
            const response = await API({
                method: 'get',
                url: '/api/auth'
            });

            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

})();

export default sn_v1_account_repo;