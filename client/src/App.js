import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route  path="/" element={<><Header /> <Posts /><Footer /></>}/>
            <Route  path="/register" element={<><Header /> <RegisterPage /><Footer /></>}/>
            <Route  path="/login" element={<><Header /> <LoginPage /><Footer /></>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
