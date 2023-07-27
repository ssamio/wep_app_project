import { checkAuth, register } from "../auth";
import { useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material";

const FormContainer = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '400px',
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

    useEffect(() => {
        setLoginState(checkAuth());
    }, [checkAuth()])

    const { t, i18n } = useTranslation();

    const handleRegister = async () => {
        if(!loginState){
            const credentials = { email, password };
            const result = await register(credentials);

            if(result){
                alert(result);
                return navigate("/login");
            }
            return null; 
        }        
    }; 

    return (
        <FormContainer>
            <Typography>{t('Register title')}</Typography>
            <TextField type="text" placeholder={t('Email')} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField type="password" placeholder={t('Password')} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleRegister}>{t('Register')}</Button>
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