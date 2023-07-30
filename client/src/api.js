//handles requests to api that handles content
import axios from 'axios';

const API_URL = "/api";

const api = axios.create({
    baseURL: API_URL,
});

//Fetch all posts 
export const getPosts = async() => {
    let response;
    await api.get('/posts')
    .then(({data}) => {
        response = data;
    })
    .catch((error) => {
        response = null;
        console.log(error.response.data.error);
    })
    return response;
}

//Fetch comments of a given post
export const getComments = async(postId) => {
    let response; 
    await api.get('/comments/'+ postId)
    .then(({data}) => {
        response = data;
    })
    .catch((error) => {
        response = null;
        console.log(error.response.data.error);
    });
    return response;
}

//Change username API call
export const changeUsername = async(userId, username) => {
    let response;
    const token = localStorage.getItem("auth_token");
    if(!token) return null;
    await api.put('/user/' + userId, username,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(({data}) => {
        //console.log(data.message);
        response = true;
    })
    .catch((error) =>{
        response = false;
        console.log(error.response.data.error);
    })
    return response;
}

//Delete user API call
export const deleteUser = async(userId) => {
    let response;
    const token = localStorage.getItem("auth_token");
    if(!token) return null;
    await api.delete('/user/' + userId,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(({data}) => {
        //console.log(data.message);
        response = true;
    })
    .catch((error) =>{
        response = false;
        console.log(error.response.data.error);
    })
    return response;
}

//Get all users for admin panel
export const getUsers = async() => {
    let response;
    const token = localStorage.getItem("auth_token");
    if(!token) return null;
    await api.get('/users',{
      headers: {
        "Authorization": "Bearer " + token
      }  
    })
    .then(({data}) => {
        response = data;
    })
    .catch((error) => {
        response = null;
        console.log(error.response.data.error);
    })
    return response;
}

//Get username from database
export const getUsername = async(userId) => {
    let response;
    const token = localStorage.getItem("auth_token");
    if(!token) return null;
    await api.get('/name/' + userId,{
      headers: {
        "Authorization": "Bearer " + token
      }  
    })
    .then(({data}) => {
        response = data;
    })
    .catch((error) => {
        response = null;
        console.log(error.response.data.error);
    })
    return response;
}

//Post a new post
export const postPost = async(content) => {
    let response;
    const token = localStorage.getItem("auth_token");
    if(!token) return null;
    await api.post('/post', content, {
        headers: {
            "Authorization": "Bearer " + token
      } 
    })
    .then(({data}) => {
        response = true;
        console.log(data.message);
    })
    .catch((error) => {
        response = false;
        console.log(error.response.data.error);
    })
    return response;
}

//Delete post
export const deletePost = async(postId) => {
    let response;
    const token = localStorage.getItem("auth_token");
    if(!token) return null;
    await api.delete('/post/' + postId,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(({data}) => {
        console.log(data.message);
        response = true;
    })
    .catch((error) =>{
        response = false;
        console.log(error.response.data.error);
    })
    return response;
}

//Edit post
export const editPost = async(postId, content) => {
    let response;
    const token = localStorage.getItem("auth_token");
    if(!token) return null;
    await api.put('/post/' + postId, content,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(({data}) => {
        console.log(data.message);
        response = true;
    })
    .catch((error) =>{
        response = false;
        console.log(error.response.data.error);
    })
    return response;
}
