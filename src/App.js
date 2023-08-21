
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import Forgotpassword from './components/Auth/forgotpassword';
import PasswordReset from './components/Auth/PasswordReset';
import React, { useContext } from 'react';
import { UserContext } from './components/Auth/Authorization';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserInfo from './components/userinfo/UserInfo';
import Urlshortner from './components/URL/Urlshortner';
import UrlList from './components/URL/UrlList';


function App() {

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  console.log(user);
  const id = user ? user.userId : null;
  console.log(id);


  const handleLogout = () => {
    setUser(null);
    localStorage.clear()
    navigate('/')
  };

  return (

    <div className="App">
      <AppBar className='AppBar' position="static">
        <Toolbar className='navbar-tools'>
          <button className='appbar-btn' color="inherit" onClick={() => navigate("/")}>
            Home
          </button>
          <button className='appbar-btn' color="inherit" onClick={() => navigate("/urlList")}>
            URLs
          </button>

          {user === null ?
            <button className='appbar-btn' color="inherit" onClick={() => navigate("/login")}>
              Login
            </button>
            : <div>
              <IconButton ><AccountCircleIcon className='iconbutton' onClick={() => navigate(`/userdata/${id}`)} /></IconButton>
              <button className='appbar-btn' color="inherit" onClick={handleLogout}>
                Logout
              </button>
            </div>}


        </Toolbar>
      </AppBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sendpasswordlink' element={<Forgotpassword />} />
        <Route path='/forgotpassword/:id/:token' element={<PasswordReset />} />
        <Route path='/userdata/:id' element={<UserInfo />} />
        <Route path='/urlshortner' element={<Urlshortner />} />
        <Route path='/urlList' element={<UrlList />} />
      </Routes>
    </div>

  );
}

export default App;
