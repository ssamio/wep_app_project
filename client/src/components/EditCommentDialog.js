import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const EditCommentDialog = ({ text, open, onClose, onTextSubmit }) => {
  const [editedText, setEditedText] = useState(text);

  const { t, i18n } = useTranslation();

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };
  
  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };


  const handleSubmit = () => {
    onTextSubmit(editedText);
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('Edit')}</DialogTitle>
      <DialogContent>
        <TextField
          placeholder={t('Comment')}
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

export default EditCommentDialog;