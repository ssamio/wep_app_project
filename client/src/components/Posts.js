//The main main page of the web app. Contains all the posts and form to create one if user is logged in
import { checkAuth, checkAdmin, getID } from "../auth";
import { useState, useEffect, Suspense } from "react";
import { useSnackbar } from "./SnackbarContext";
import { TextField, Button, Typography } from "@mui/material";
import { getPosts, postPost } from "../api";
import { useTranslation } from 'react-i18next';
import { styled } from "@mui/material";
import Post from './Post';
import Paginator from'./Paginator';

//Upcycle the form container to div container :D also used in admin panel
const CardContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '70%',
    margin: 'auto',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
}));
//Custom formcontainer for new post creation. Only visible to logged in users
const FormContainer = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '60%',
    margin: 'auto',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}));

const Posts = () => {
    const [loginState, setLoginState] = useState(false);
    const [adminState, setAdminState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to show per page
    const [totalItems, setTotalItem] = useState(0);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [userID, setUserID] = useState('');
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const { showSnackbar } = useSnackbar();

    //Check privileges, fetch posts
    useEffect(() => {
        setLoginState(checkAuth());
        setAdminState(checkAdmin());
        setUserID(getID());
        handlePostsFetch();
    }, [loginState, adminState]);

    const { t, i18n } = useTranslation();

    //Pagination page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //Handle fetching posts
    const handlePostsFetch = async() => {
        const response = await getPosts();
        if(response){
            setPosts(response);
            setTotalItem(response.length);
        }
        else{
        showSnackbar((t('Failure')), 'error');
        }
    }

    //Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentPosts = posts.slice(startIndex, endIndex);

    //Handle new post creation
    const handleCreatePost = async() => {
        if(loginState){
            const content = { title, text };
            const response = await postPost(content);
            if(response === true){
                showSnackbar((t('Success')), 'success');
                setTitle('');
                setText('');
                return handlePostsFetch();
            }
            else{
                return showSnackbar((t('Failure')), 'error');
            }
        }
    }

    return (
        <>
            {
            loginState ?
                <FormContainer>
                    <TextField type="text" value={title} placeholder={t('Title')} onChange={(e) => setTitle(e.target.value)}></TextField>
                    <TextField type="text" value={text} multiline rows={4} placeholder={t('Code')} onChange={(e) => setText(e.target.value)}></TextField>
                    <Button onClick={handleCreatePost} variant="contained">{t('Submit new post')}</Button>
                </FormContainer>
            :
                <></>
            }
            <CardContainer>
                {
                    posts.length === 0 ?
                    <Typography>{t('No posts')}</Typography>
                    :
                    <>
                        {
                            currentPosts.map((item) => (
                                
                                <Post 
                                    key={item._id}
                                    item={item}
                                    admin={adminState}
                                    login={loginState}
                                    userId={userID}
                                    parentFunction={handlePostsFetch}
                                >
                                </Post>   
                            ))
                        }
                      <Paginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onChangePage={handlePageChange}
                        />
                    </>
                }
            </CardContainer>
               
        </>
    )
}

export default function App(){
    return (
        <Suspense fallback="loading">
            <Posts />
        </Suspense>
    )
}
