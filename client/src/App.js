import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Footer from './components/Footer';
import { styled } from '@mui/material/styles';
import Admin from './components/Admin';
import Comments from './components/Comments';

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

function App() {
  return (
    <Router>
        <Responsive className="App">
          <Routes>
            <Route  path="/" element={<><Header /> <Posts /> <Footer /></>}/>
            <Route  path="/register" element={<><Header /> <RegisterPage /> <Footer /></>}/>
            <Route  path="/login" element={<><Header /> <LoginPage /> <Footer /></>}/>
            <Route  path="/post" element={<><Header /> <Comments /> <Footer /></>}/>
            <Route  path="/admin" element={<><Header /> <Admin /> <Footer /></>}/>
          </Routes>
        </Responsive>
      </Router>
  );
}

export default App;
