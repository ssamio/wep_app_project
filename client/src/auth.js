//Handles authentication
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AUTH_URL = "/auth";
const auth = axios.create({
    baseURL: AUTH_URL,
});

//Function to check login state (including if token is expired or not)
export const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    
    if(!token){
        return false;
    }
    else{
        const decoded = jwt_decode(token);
        if(decoded.exp === undefined) return false;
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decoded.exp);

        if(expirationDate < new Date()){
            return false;
        }
        else if(expirationDate > new Date()){
            return true;
        }
    }
}
//Function to check if user is admin or not
export const checkAdmin = () => {
    const token = localStorage.getItem("auth_token");

    if(!token){
        return false;
    }
    else{
        const decoded = jwt_decode(token);
        if (decoded.adminStatus === undefined) return false;
        else if (decoded.adminStatus === false) return false;
        else if (decoded.adminStatus === true) return true;
    }
}

//Logout
export const logout = () => {
    return localStorage.removeItem("auth_token");
}

//Login, on success save the token to local storage
export const login = async(credentials) => {
    try {
        const response = await auth.post('/login', credentials);
        if(response.data.token){
            localStorage.setItem('auth_token', response.data.token);
            return response.data.message;
        }
        else{
            return response.data.error;
        }
    }
    catch (error){
        console.error('Login failed: ', error);
    }
}
export const register = async(credentials) => {
    try {
        const response = await auth.post('/register', credentials);
        if(response.data.message){
            return response.data.message;
        }
        else{
            return response.data.error;
        }
    }
    catch (error){
        console.error('Registration failed: ', error);
    }
}