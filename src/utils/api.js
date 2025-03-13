import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const postRequest = async (url, data, headers = {}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${url}`, data, {
            headers: { 'Content-Type': 'application/json', ...headers }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error(response?.message || 'server Error');
    }
};

export const getRequest = async (url, token = '') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${url}`, {
            headers: token ? { 'access-token': token } : {},
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
};

export const deleteRequest = async (url, token = '') => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${url}`, {
            headers: token ? { 'access-token': token } : {},
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
}