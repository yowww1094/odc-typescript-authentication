import React, { useEffect, useState } from 'react'
import { LoginForm } from '../components/login-form'
import axios from 'axios';
import { API_LINK } from '@/config/axios';
import { useNavigate } from 'react-router';

function Login() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token) navigate('/');
    }, []);

    const handleLogin = async (data) => {
      setFormData(prev => ({...prev, data}));
      const newErrors = [];
      
      if (!data.email) newErrors.push = "Email is invalid!";
      if (!data.password || data.password.length < 7) newErrors.push = "Password is invalid!";
      
      setErrors(newErrors);
      if(Object.keys(newErrors).length > 0) return null;

      await axios.post(API_LINK + 'login', {
          email: data.email,
          password: data.password
      }).catch(err => setErrors(prev => ([...prev, err.response.data.message])))
      .then(response => {
        localStorage.setItem('token', response.data.user.jwtToken);
        localStorage.setItem('user_id', response.data.user._id);
        navigate('/');
      });
    }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm handleLogin={handleLogin} errors={errors} />
      </div>
    </div>
  )
}

export default Login