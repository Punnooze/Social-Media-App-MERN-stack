
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';

function App() {
  
  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Routes path="/" element = {<LoginPage />}/>
        <Routes path="/home" element = {<HomePage />}/>
        <Routes path="/profile/:userId" element = {<ProfilePage />}/>        
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
