import axios from 'axios';

const API_URL = "/api";

const api = axios.create({
    baseURL: API_URL,
});

export const getPosts = async() => {
    const response = await api.get('/posts');
    return response.data;
}

export const getComments = async(postId) => {
    const response = await api.get('/comments'+ postId);
    return response.data;
}
