import { SignupForm } from '@/components/signup-form'
import { API_LINK } from '@/config/axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function Register() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token) navigate('/');
    }, []);

    const handleRegister = async (data) => {
      setFormData(data);
      const newErrors = [];
      
      if(!data.name) newErrors.push = "Name is required!";
      if(!data.email) newErrors.push = "Email is required!";
      if(!data.password || data.password.length < 7) newErrors.push = "Password is required!";
      if(!data.passowrdConfirmation || data.passowrdConfirmation !== data.password) 
        newErrors.push = "Confirmation Password is invalid!";
        
      setErrors(newErrors);
      if(errors.length > 0) return null;
        
      await axios.post(API_LINK + 'register', {
        name: data.name,
        email: data.email,
        password: data.password,
        passowrdConfirmation: data.passowrdConfirmation,
      }).catch((err) => setErrors(prev => ([...prev, err.response.data.message])))
      .then(res => navigate('/login'));
    };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm handleRegister={handleRegister} errors={errors} />
      </div>
    </div>
  )
}

export default Register