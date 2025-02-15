import axios from 'axios'; 
import { FETCH_API_BASE_URL } from '../constants';

// Create the axios instance 
const axiosInstance = axios.create({
    baseURL: FETCH_API_BASE_URL,
    withCredentials: true,  //include for auth cookies
    headers: {
        'Content-Type': 'application/json',
    }
}); 

// class based api utility
class FetchAPI {

    // Auth endpoints
    static async login(data) {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    static async logout() {
        try {
            const response = await axiosInstance.post('/auth/logout');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    
    // Dogs endpoints
    static async searchDogs(params) {
        try {
            const response = await axiosInstance.get('/dogs/search', { params });
            return {
                resultIds: response.data.resultIds,
                total: response.data.total,
                next: response.data.next,
                prev: response.data.prev
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    static async getBreeds() {
        try {
            const response = await axiosInstance.get('/dogs/breeds');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    static async getDogsByIds(ids) {
        try {
            const response = await axiosInstance.post('/dogs', ids);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    static async getMatch(favoriteIds) {
        try {
            const response = await axiosInstance.post('/dogs/match', favoriteIds);
            return response.data.match;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Locations endpoints
    static async searchLocations(searchParams) {
        try {
            const response = await axiosInstance.post('/locations/search', searchParams);
            return {
            results: response.data.results,
            total: response.data.total
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    static async getLocationsByZip(zipCodes) {
        try {
            const response = await axiosInstance.post('/locations', zipCodes);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    static handleError(error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Operation failed');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}; 

export default FetchAPI; 