import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://192.168.1.16:8080`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // perform a task before the request is sent
    console.log("Request was sent");

    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // do something with the response data
    console.log("Response was received");

    return response.data;
  },
  (error) => {
    // handle the response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
