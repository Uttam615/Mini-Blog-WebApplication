import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import PostList from "./Components/Home/PostList";
import CreatePost from "./Components/PostCreate/CreatePost";
import UpdatePost from "./Components/PostUpdate/UpdatePost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/updatePost/:id" element={<UpdatePost />} />
      </Routes>
    </div>
  );
}

export default App;
