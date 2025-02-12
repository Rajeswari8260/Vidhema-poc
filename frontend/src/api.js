import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const signup = async (userData) => {
    return await axios.post(`${API_URL}signup/`, userData);
};

export const login = async (email, password) => {
    return await axios.post(`${API_URL}login/`, { email, password });
};

export const forgotPassword = async (email, password) => {
    return await axios.post(`${API_URL}login/`, { email, password });
};

export const userpage = async (email, password) => {
    return await axios.post(`${API_URL}login/`, { email, password });
};