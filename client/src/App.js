import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from './components/SnackbarContext';
import Header from './components/Header';
import Posts from './components/Posts';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { styled } from '@mui/material/styles';
import Admin from './components/Admin';
import Comments from './components/Comments';
import UserSettings from './components/UserSettings';

//Make app responsive to screen size
const Responsive = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (min-width: 600px)': {
    flexDirection: 'column',
    '& > div': {
      flexBasis: '50%',
    },
  },
});
//App contains all routes in the application
//Router is wrapped in SnackbarProvider to make it available in all other child components
function App() {
  return (
    <SnackbarProvider>
      <Router>
          <Responsive className="App">
            <Routes>
              <Route  path="/" element={<><Header /> <Posts /> </>}/>
              <Route  path="/register" element={<><Header /> <RegisterPage /> </>}/>
              <Route  path="/login" element={<><Header /> <LoginPage /> </>}/>
              <Route  path="/post" element={<><Header /> <Comments /> </>}/>
              <Route  path="/admin" element={<><Header /> <Admin /> </>}/>
              <Route  path="/user" element={<><Header /> <UserSettings /> </>}/>
            </Routes>
          </Responsive>
        </Router>
    </SnackbarProvider>
  );
}

export default App;
