//Single post component, with code highlighting
import { useState, Suspense } from "react";
import { TextField, Button, Typography, Card, CardContent, CardActions, Chip, CardHeader } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { deletePost, editPost } from "../api";
import { useSnackbar } from "./SnackbarContext";
import EditPostDialog from './EditPostDialog';

//Style the cards
const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '90%'
};

const Post = ({item, admin, login, userId, parentFunction}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { showSnackbar } = useSnackbar();

    //Handle edit and delete post
    const handlePostDelete = async(postId) => {
        const response = await deletePost(postId);
        if(response === true){
           showSnackbar((t('Post deleted')), 'success');
           return parentFunction();
        }
        else {
            return showSnackbar((t('Failure')), 'error');
        }
    }

    //Handle the editing dialog open
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    //Handle the editing dialog close
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handlePostEdit = async(text, title) => {
        if(login){
            const content = { title, text };
            const response = await editPost(item._id, content);
            if(response === true){
                showSnackbar((t('Succeess')), 'success');
                return parentFunction() 
            }
            else {
            return showSnackbar((t('Failure')), 'error');
            }
        }
    };

    const { t, i18n } = useTranslation();
    //Post component with editing dialog 
    return (
        <Card sx={cardStyles}>
            <CardContent style = {{width: '90%'}}>
                <Typography>{item.title}</Typography>
                <TextField  
                    fullWidth
                    multiline rows={10}
                    InputProps={{
                        readOnly: true,
                    }}
                    value={item.text}
                ></TextField>
                {
                    item.createdAt === item.updatedAt ?
                    <>
                        <Typography style={{fontSize: '12px', color: 'grey'}}>{t('Created')}: {item.createdAt}</Typography>
                    </>
                    :
                    <>
                        <Typography style={{fontSize: '12px', color: 'grey'}}>{t('Created')}: {item.createdAt}</Typography>
                        <Typography style={{fontSize: '12px', color: 'grey'}}>{t('Updated')}: {item.updatedAt}</Typography>
                    </>
                }
            </CardContent>
            {
                (item.user._id === userId && login) || (admin && login) ?
                <CardActions>
                    <Button onClick={() => handlePostDelete(item._id)} variant="contained" color="error">{t('Delete')}</Button>
                    <Button onClick={handleOpenDialog} variant="contained">{t('Edit')}</Button>
                    <Button variant="contained">{t('Comments')}</Button>
                </CardActions>
                :
                <CardActions>
                    <Button variant="contained">{t('Comments')}</Button>
                </CardActions>
            }
            <EditPostDialog
                text={item.text}
                title={item.title}
                open={dialogOpen}
                onClose={handleCloseDialog}
                onTextSubmit={handlePostEdit}
            />
        </Card>
    )
}

export default Post;