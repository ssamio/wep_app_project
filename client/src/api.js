//handles requests to api that handles content
import axios from 'axios';

const API_URL = "/api";

const api = axios.create({
    baseURL: API_URL,
});
//Fetch all posts 
export const getPosts = async() => {
    const response = await api.get('/posts');
    return response.data;
}
//Fetch comments of a given post
export const getComments = async(postId) => {
    const response = await api.get('/comments'+ postId);
    return response.data;
}
