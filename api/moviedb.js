import axios from "axios";
import { apiKey } from "../constants";

//endpoints
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}&`;
const searchTrendingEndpoint = `${baseURL}s=Trending`;
const searchUpcomingEndpoint = `${baseURL}s=Upcoming`;
const searchTopRatedEndpoint = `${baseURL}s=Top`;

//dynamic endpoints
const movieDetails = id => `${baseURL}i=${id}`;

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log('ERROR ', err)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(searchTrendingEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(searchUpcomingEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(searchTopRatedEndpoint);
}

export const fetchMovieDetails = (id) => {
    return apiCall(movieDetails(id));
}