import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../Api";
import './updatepost.css'

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "", author: null });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await Api.get(`/posts/${id}/`);
        const currentUser = localStorage.getItem("username");
        const authorUsername = typeof response.data.author === "object" 
          ? response.data.author.username 
          : response.data.author;

        if (authorUsername !== currentUser) {
          setError("You cannot update posts created by others.");
          return;
        }

        setFormData({
          title: response.data.title,
          content: response.data.content,
          author: response.data.author, // include author here
        });
      } catch (err) {
        setError("Failed to fetch post");
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const {title,content} = formData
      const response = await Api.put(`/posts/${id}/`, {title,content});
      if (response.status === 200) {
        setSuccess("Post updated successfully");
        setTimeout(() => navigate("/post"), 1500);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You are not authorized to update this post.");
      } else {
        setError("Failed to update post");
      }
    }
  };

  return (
    <div className="update-post-container">
      <h2>Update Blog Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={!!error}
        />
        <textarea
          name="content"
          placeholder="Enter content"
          value={formData.content}
          onChange={handleChange}
          rows={6}
          required
          disabled={!!error}
        />
        <button type="submit" disabled={!!error}>Update Post</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default UpdatePost;
