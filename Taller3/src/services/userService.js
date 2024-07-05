import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createUser = (user) => {
    return axios.post(`${API_URL}/users`, user);
};

export const getUsers = () => {
    return axios.get(`${API_URL}/users`);
};

export const getUser = (id) => {
    return axios.get(`${API_URL}/users/${id}`);
};

export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

