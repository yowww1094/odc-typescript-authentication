import { HeaderSection1 } from '@/components/pro-blocks/landing-page/header-sections/header-section-1'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

import { API_LINK } from '@/config/axios';
import axios from 'axios';

function Home() {

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getUserData = async (token) => {
    const userId = localStorage.getItem('user_id');
    await axios.get(API_LINK + 'users/' + userId, {headers: {'authorization': 'Bearer '+token}})
    .catch(err => {
      if(err.status === 401) navigate('/navigate');
    })
    .then(response => setUserData(response.data.user));
  };

  useEffect( ()=>{
    const token = localStorage.getItem('token');
    if(!token) navigate('/login');

    getUserData(token);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    await axios.get(API_LINK + 'logout', {headers: {'authorization': 'Bearer ' + token, id: userId}})
    .then(response => {
      if (response.status === 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        navigate('/login')
      }
    })
    
  };

  return (
    <HeaderSection1 userData={userData} onLogout={handleLogout} />
  )
}

export default Home