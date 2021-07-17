import axios from 'axios'

const axiosInstance = axios.create({});

const API = async function (options) {
  const onSuccess = (response) => response.data;
  const onError =  (error) => Promise.reject(error.response || error.message); 
       
  try {
    const response = await axiosInstance(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export {
  API,
  axiosInstance 
} ;
