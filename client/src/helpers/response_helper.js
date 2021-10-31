const response_helper = (() =>{

    return {
        create_internal_error,
        map_response,
        API_error
    }

    /**
     * 
     * @param {string} message 
     */
    function create_internal_error(message){
        return {
            status: 401,
            data: {
                message: message
            }
        }
    }

    function map_response(response, httpStatusCode){
        var output = {};

        output.status = response.status ? response.status : httpStatusCode;

        if(!response){
            return response;
        }

        if(!response.data){
            return output;
        }

        if( !Array.isArray(response.data)){
            output.data = mapObjectToArray(response.data)
        }else{
            output.data = response.data;
        }

        return output;
        
    }

    function mapObjectToArray(model){
        var output = [];

        if(!model)
            return output;

        output.push(model);
        
        return output;
    }

    function API_error(response){
        let output = {};

        if(!response){
            return output;
        }

        if(!response.status){

        }

        if(!response.data){
            return [];
        }
        
        console.log(response)

        switch (response.status) {
            case 400:
            case 401:
            case 404:
            case 500:
                return 
            case 200:
                return 
            default:
                return 
        }
    }
})();

export default response_helper;