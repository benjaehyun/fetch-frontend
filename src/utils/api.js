import axios from 'axios'; 
import { FETCH_API_BASE_URL } from '../constants';

// Create the axios instance 
const api = axios.create({
    baseURL: FETCH_API_BASE_URL,
    withCredentials: true,  //include for auth cookies
    headers: {
        'Content-Type': 'application/json',
    }
}); 

// Define the api endpoints we be using, concisely
const endpoints = {
    auth: {
        login: (data) => api.post('/auth/login', data), 
        logout: () => api.post('/auth/logout')
    }, 
    dogs: {
        search: (params) => api.get('/dogs/search', { params }),
        breeds: () => api.get('/dogs/breeds'),
        getById: (ids) => api.post('/dogs', ids),
        match: (favoriteIds) => api.post('/dogs/match', favoriteIds),
    },
    locations: {
        search: (data) => api.post('/locations/search', data),
        getByZipCodes: (zipCodes) => api.post('/locations', zipCodes),
    },
}

export default endpoints; 