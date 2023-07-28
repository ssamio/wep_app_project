//Snackbar component to show feedback to user
import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useState, useContext } from 'react';

const SnackbarContext = createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}
//Provides a global snackbar context to the whole app, thus making it possible to deliver feedback to user with it
export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const showSnackbar = (message, severity = 'success') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

   const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
//Return this component
  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}