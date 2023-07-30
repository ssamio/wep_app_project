//Show comments in a fullscreen dialog, cause why not
import React, { useState, useEffect } from 'react';
import { Button, Dialog, Card, List, Divider, AppBar, Toolbar, IconButton, Typography, Slide, CardContent, TextField, CardActions} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from "./SnackbarContext";
import { getComments, editComment, deleteComment, postComment } from '../api';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import EditCommentDialog from './EditCommentDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommentDialog = ({ open, onClose, postId, userId, login, admin }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const { showSnackbar } = useSnackbar();

    const { t, i18n } = useTranslation();

    useEffect(() => {
        handleCommentsFetch();
    }, []);

    //Fetch comments
    const handleCommentsFetch = async() => {
        const response = await getComments(postId);
        if(response){
            setComments(response)
        }
        else{
            showSnackbar((t('Failure')), 'error');
        }

    };

    //Handle comment delete
    const handleCommentDelete = async(commentId) => {
        const response = await deleteComment(commentId);
        if(response === true){
            showSnackbar((t('Comment deleted')), 'success');
           return handleCommentsFetch();    
        }
        else{
            return showSnackbar((t('Failure')), 'error');
        }
    }

    //Handle comment edit
    const handleCommentEdit = async(editedText, commentId) => {
        if(login){
            const content = {text: editedText, post: postId};
            const response = await editComment(commentId, content);
            if(response === true){
                showSnackbar((t('Succeess')), 'success');
                return handleCommentsFetch();  
            }
            else{
                return showSnackbar((t('Failure')), 'error');    
            }
        }

    }

    //Edting dialog handlers
    const handleOpenDialog = () => {
        setDialogOpen(true);
    }
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    //Handle creating a new comment
    const handleNewComment = async () => {
        if(login){
            const content = { text, post: postId };
            console.log(content)
            const response = await postComment(content);
            if(response === true){
                showSnackbar((t('Success')), 'success');
                setText('');
                return handleCommentsFetch(); 
            }

        }
    }

  return (
    <Dialog
    fullScreen
    open={open}
    onClose={onClose}
    TransitionComponent={Transition}
    >
    <AppBar sx={{ position: 'relative', color: "#c1c1c1", backgroundColor:"#282b30" }}>
        <Toolbar>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {t('Comments')}
        </Typography>
        {
            login === true ?
                <>
                <TextField type='text' sx={{backgroundColor:'white'}} placeholder={t('New Comment')} value={text} onChange={(e) => setText(e.target.value)} />
                <Button onClick={handleNewComment} color="inherit">{t('Submit')}</Button>
                </>
                :
                <></>
        }
        <Button color="inherit" onClick={onClose}>
            <ClearIcon />
        </Button>
        </Toolbar>
    </AppBar>
    <List>
        {
            comments.map((item) => (
                <Card key={item._id}>
                    <CardContent>
                        <Typography>{item.user.username}</Typography>
                        <Typography>{item.text}</Typography>
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
                            <Button onClick={() => handleCommentDelete(item._id)} variant="contained" color="error"><DeleteForeverIcon /></Button>
                            <Button onClick={handleOpenDialog} variant="contained"><EditIcon /></Button>
                            </CardActions>
                        :
                        <></>
                    }
                <EditCommentDialog
                    text={item.text}
                    post={item._id}
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    onTextSubmit={handleCommentEdit}
                />
                </Card>
            ))
        }
    </List>
    </Dialog>
  );
}
export default CommentDialog;