//Registration page
import { checkAuth, register } from "../auth";
import { useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { useSnackbar } from "./SnackbarContext";

//Custom component for the form
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

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginState, setLoginState] = useState(false);
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    
    //Check user login state. Logged in user's cannot submit the form.
    useEffect(() => {
        setLoginState(checkAuth());
    }, [loginState])

    const { t, i18n } = useTranslation();
    //Handle user registration. On success redirect to login page and show success alert. On failure show failure alert.
    const handleRegister = async () => {
        if(!loginState){
            const credentials = { email, password };
            const response = await register(credentials);

            if(response === true){
                showSnackbar((t('Register success')), 'success');
                return navigate("/login");
            }
            else{
                return showSnackbar((t(response)), 'error');
            }
        }        
    }; 
    //Registration form using the custom component
    return (
        <FormContainer>
            <Typography>{t('Register title')}</Typography>
            <TextField type="text" placeholder={t('Email')} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField type="password" placeholder={t('Password')} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleRegister}>{t('Register')}</Button>
        </FormContainer>
    )
}
export default function App(){
    return (
        <Suspense fallback="loading">
            <RegisterPage />
        </Suspense>
    )
}