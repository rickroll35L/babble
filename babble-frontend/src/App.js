import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useCallback, useState } from "react";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Post from "./pages/Post/Post.js";
import Profile from "./pages/Profile/Profile.js";
import axios from 'axios';

// localStorage.setItem(
//   "AuthToken",
//   "Bearer FAKETOKEN#ASDOANSCOAOCBDIVB",
// );
const token = localStorage.getItem("AuthToken");
const apiURL = "http://localhost:8080/";

if (token) {

}

const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: token
  }
});

function App() {

  const getUser = useCallback(async (uid) => {
    try {
      const result = await authAxios.get(`/users/${uid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const createUser = useCallback(async (body) => {
    try {
      const result = await authAxios.post(`/users/create-user`, body);
      if(result==="User was added"){
        return getUser(body.id) // need to put auth somewhere too
      }
      else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  });

  const deleteUser = useCallback(async (uid) => {
    try {
      const result = await authAxios.delete(`/users/${uid}/delete`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const getPosts = useCallback(async () => {
    try {
      const result = await authAxios.get(`/posts`);
      setPosts(result);
    } catch (err) {
      console.log(err);
    }
  });

  const getPost = useCallback(async (pid) => {
    try {
      const result = await authAxios.get(`/posts/${pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const createPost = useCallback(async (uid) => {
    try {
      const result = await authAxios.post(`/users/${uid}/create-post`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const deletePost = useCallback(async (pid) => {
    try {
      const result = await authAxios.delete(`/posts/${pid}/delete`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const makeComment = useCallback(async (props) => {
    try {
      const result = await authAxios.post(`/users/${props.uid}/comment/${props.pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const likePost = useCallback(async (props) => {
    try {
      const result = await authAxios.post(`/users/${props.uid}/like/${props.pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const savePost = useCallback(async (props) => {
    try {
      const result = await authAxios.post(`/users/${props.uid}/save/${props.pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const searchPost = useCallback(async (query) => {
    try {
      const result = await authAxios.get(`/posts/search/${query}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/post/:postId" component={Post}></Route>
          <Route exact path="/profile" component={Profile}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
