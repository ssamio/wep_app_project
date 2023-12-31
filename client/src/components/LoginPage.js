//Login page
import { checkAuth, login } from "../auth";
import { useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { useSnackbar } from "./SnackbarContext";

//custom component for form
const FormContainer = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '40%',
    margin: 'auto',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}));

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginState, setLoginState] = useState(false);
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    //Check user's login status. Logged in user's cannot submit the login form
    useEffect(() => {
        setLoginState(checkAuth());
    }, [checkAuth()])

    const { t, i18n } = useTranslation();

    //Handle login, on success navigates to front page and displays an alert with success message. On failure show failure alert to user.
    const handleLogin = async () => {
        if(!loginState){
            const credentials = { email, password };
            const response = await login(credentials);
            if(response === true){
                showSnackbar((t('Login success')), 'success');
                return navigate('/');
            }
            else{
                return showSnackbar((t(response)), 'error');
            }
        }        
    }; 
    //Simple login form using the custom component
    return (
        <FormContainer>
            <Typography>{t('Login title')}</Typography>
            <TextField type="text" placeholder={t('Email')} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField type="password" placeholder={t('Password')} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleLogin}>{t('Login')}</Button>
        </FormContainer>
    )
}
export default function App(){
    return (
        <Suspense fallback="loading">
            <LoginPage />
        </Suspense>
    )
}