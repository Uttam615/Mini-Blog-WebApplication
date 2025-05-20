import React, { useState } from 'react'
import './Createpost.css'
import Api from '../../Api'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({title:"",content:""});
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await Api.post("/posts/",formData);
            if(response.status ===201){
                setSuccess("Post Created Succesfully..");
                navigate("/post")
            }
        }
        catch(err){
            setError("Failed to create post.Make sure you're logged in")
        }
    };
  return (
    <div className='create-post-container'>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} className='create-post-form'>

        <input type="text" name='title' placeholder='Post' value={formData.title} onChange={handleChange} required />
        <textarea name="content" placeholder='post-content' value={formData.content} onChange={handleChange} required/>

        <button type='submit'>Create Post</button>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}


      </form>
    </div>
  )
}

export default CreatePost
