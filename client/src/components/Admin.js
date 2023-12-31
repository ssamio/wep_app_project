//Admin panel where admin can delete users or change their usernames
import { checkAuth, checkAdmin } from "../auth";
import { useState, useEffect, Suspense } from "react";
import { useSnackbar } from "./SnackbarContext";
import { TextField, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import { deleteUser, changeUsername, getUsers } from "../api";
import { useTranslation } from 'react-i18next';
import { styled } from "@mui/material";

//Upcycle the form container to div container :D 
const CardContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '50%',
    margin: 'auto',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1)
}));
//Style the cards
const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '60%'
};

const Admin = () => {
    const [loginState, setLoginState] = useState(false);
    const [adminState, setAdminState] = useState(false);
    const [text, setText] = useState([]);
    const [users, setUsers] = useState([]);
    const { showSnackbar } = useSnackbar();
    
    //Check privileges, fetch users
    useEffect(() => {
        setLoginState(checkAuth());
        setAdminState(checkAdmin());
        handleUserFetch();
    }, [loginState, adminState]);
    
    const { t, i18n } = useTranslation();
    
    //Fetch users and create their input fields states
    const handleUserFetch = async() => {
        const response = await getUsers();
        if(adminState && loginState){
            if(response){
                setUsers(response);
                setText(response.map((item) => ({id: item._id, value: ''})));
            }
            else{
                showSnackbar((t('Failure')), 'error');
            }
        }
        
    }

    //Handle username change and user deletion through 
    const handleUsernameChange = async(userId, index) => {
        const payload = {username: text[index].value};
        const response = await changeUsername(userId, payload);
        if(response === true){
            showSnackbar((t('Username changed')), 'success');
            setUsers(await getUsers());
        }
        else{
            showSnackbar((t('Failure')), 'error');
        }
    }

    const handleUserDeletion = async(userId) => {
        const response = await deleteUser(userId);
        if(response === true){
            showSnackbar((t('User deleted')), 'success');
            setUsers(await getUsers());
        }
        else{
            showSnackbar((t('Failure')), 'error');
        }
    }
    //Handle text field changes
    const handleChange = (e, index) => {
        const values = [...text];
        values[index].value = e.target.value;
        setText(values);
    };

    return (
        <CardContainer>
            {
                users.map((user, index) => (
                    <Card sx={cardStyles} key={user._id}>
                        <CardContent>
                            <Typography>{t('Email')}: {user.email}</Typography>
                            {
                                user.username === user.email ?
                                <></>
                                :
                                <Typography>{t('Username')}: {user.username}</Typography>
                            }
                            <TextField type="text" placeholder={t('Username')} value={text[index].value} onChange={(e) => handleChange(e, index)} />
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleUsernameChange(user._id, index)} variant="contained">{t('Submit')}</Button>
                            <Button onClick={() => handleUserDeletion(user._id)} variant="contained" color="error">{t('Delete')}</Button>
                        </CardActions>
                    </Card>
                ))
            }
         
        </CardContainer>
    )
}

export default function App(){
    return (
        <Suspense fallback="loading">
            <Admin />
        </Suspense>
    )
}