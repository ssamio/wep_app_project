//Component dialog for editing posts
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const EditPostDialog = ({ text, title, open, onClose, onTextSubmit }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedText, setEditedText] = useState(text);

  const { t, i18n } = useTranslation();

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };
  
  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };


  const handleSubmit = () => {
    onTextSubmit(editedText, editedTitle);
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('Edit')}</DialogTitle>
      <DialogContent>
        <TextField
          placeholder={t('Title')}
          margin="dense"
          label="Text"
          type="text"
          fullWidth
          value={editedTitle}
          onChange={handleTitleChange}
        />
        <TextField
          placeholder={t('Code')}
          margin="dense"
          label="Text"
          type="text"
          fullWidth
          multiline
          rows={10}
          value={editedText}
          onChange={handleTextChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          {t('Cancel')}
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {t('Submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;