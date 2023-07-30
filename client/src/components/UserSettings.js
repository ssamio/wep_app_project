//User setting page. User can change their displayname/username and delete their account along with all the posts and comments
import { checkAuth, getID, logout } from "../auth";
import { useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import { styled } from "@mui/material";
import { deleteUser, changeUsername, getUsername } from "../api";
import { useSnackbar } from "./SnackbarContext";

//Recycle the same form container as always. It works, why change.
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

const UserSettings = () => {
    const [loginState, setLoginState] = useState(false);
    const [userId, setUserId] = useState('');
    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    //Check user's login status and get id
    useEffect(() => {
        setLoginState(checkAuth());
        setUserId(getID());
        handleUsernameFetch();
    }, [checkAuth(), getID()])

    const { t, i18n } = useTranslation();

    //Fetch username
    const handleUsernameFetch = async() => {
        const id = await getID();
        const response = await getUsername(id);
        if(response){
            setUsername(response);
        }
        else{
            return null;
        }
    }

    //Handle username change and user deletion through api functions
    const handleUsernameChange = async() => {
        const payload = {username: text};
        const response = await changeUsername(userId, payload);
        if(response === true){
            showSnackbar((t('Username changed')), 'success');
            setUsername(await getUsername(userId));
        }
        else{
            showSnackbar((t('Failure')), 'error');
        }
    }

    const handleUserDeletion = async() => {
        const response = await deleteUser(userId);
        if(response === true){
            showSnackbar((t('User deleted')), 'success');
            logout();
            return navigate('/');
        }
        else{
            showSnackbar((t('Failure')), 'error');
        }
    }

    //Conditional rendering to produce a user settings form
    return (
        <FormContainer>
            {
                loginState ?
                <>
                    <Typography>{t('Settings title')} {username}</Typography>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography>{t('Username change')}</Typography>
                            <TextField type="text" placeholder={t('Username')} value={text} onChange={(e) => setText(e.target.value)} />
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleUsernameChange} variant="contained">{t('Submit')}</Button>
                        </CardActions>
                    </Card>
                    <Card variant="outlined" color="error">
                        <Typography color="error">{t('Danger')}</Typography>
                        <CardContent>
                            <Typography>{t('Delete user')}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleUserDeletion} variant="contained" color="error">{t('Delete')}</Button>
                        </CardActions>
                    </Card>
                </>
                :
                <>
                <Typography>{t('Please')}</Typography>
                </>
            }
            
        </FormContainer>
    )
}

export default function App(){
    return (
        <Suspense fallback="loading">
            <UserSettings />
        </Suspense>
    )
}