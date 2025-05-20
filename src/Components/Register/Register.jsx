import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../Api'
import './Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => 
    setFormData({...formData, [e.target.name]: e.target.value});
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(formData.password !== formData.confirm_password){
      setError("Passwords do not match")
      return;
    }
    
    try {
      const response = await Api.post('/register/',formData);
      if(response.status===200||response.status){
        navigate('/post');
      }
    }
      catch(err){
        setError("Registration Failed.Please Try Again")
      }
  };
  
  return (
    <div className='register-container'>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder="Username" value={formData.username}
          onChange={handleChange} required />

        <input 
          type="email"  name="email" placeholder='Email address' value={formData.email}
          onChange={handleChange} required />

        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} 
          required/>

        <input type="password" name='confirm_password' placeholder='Confirm password' value={formData.confirm_password}
          onChange={handleChange} required/>
          
        <button type='submit'>Register</button>
        {error && <p className='error'>{error}</p>}
      </form>
      
      <div className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  )
}

export default Register