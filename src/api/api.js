// src/api/api.js
import axios from 'axios';
const baseURL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
    baseURL,
});


apiClient.interceptors.response.use(
    response => response,
    error => {
        // 在这里处理错误，比如显示错误信息或者记录日志
        return Promise.reject(error);
    }
);

export default {
    getItem() {
        return apiClient.get('/todos');
    }
};
