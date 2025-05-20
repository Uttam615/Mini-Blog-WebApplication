import React, { useState, useEffect } from "react";
import Api from "../../Api";
import { useNavigate, Link } from "react-router-dom";
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Api.get("/posts/");
        setPosts(response.data);
      } catch (err) {
        setError("Failed to load posts. Make sure you are logged in.");
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await Api.delete(`/posts/${id}/`);
      setPosts(posts.filter((post) => post.id !== id));
      setSuccess("Post deleted successfully");
      setTimeout(() => setSuccess(""), 2000);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("You are not authorized to delete this post.");
      } else {
        setError("Failed to delete post");
      }
      setSuccess("");
    }
  };

  const handleUpdateClick = (postAuthor, postId) => {
    const authorUsername = typeof postAuthor === "object" ? postAuthor.username : postAuthor;

    if (authorUsername !== currentUser) {
      alert("You cannot update posts created by others.");
      return;
    }
    navigate(`/updatePost/${postId}`);
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <h2>All Blog Posts</h2>
        <div className="auth-buttons">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/logout"><button>Logout</button></Link>
        </div>
      </div>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="create-post-btn" onClick={() => navigate("/CreatePost")}>
        ➕ New Post
      </button>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            className="post-card"
            key={post.id}
            style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
              <strong>Author:</strong> {typeof post.author === "object" ? post.author.username : post.author} | <strong>Created:</strong>{" "}
              {new Date(post.created).toLocaleString()}
            </p>

            <div>
              <button onClick={() => handleUpdateClick(post.author, post.id)}>Update</button>{" "}
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
