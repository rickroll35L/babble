import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Post from "./pages/Post/Post.js";
import Profile from "./pages/Profile/Profile.js";
import axios from 'axios';

// localStorage.setItem(
//   "AuthToken",
//   "Bearer FAKETOKEN#ASDOANSCOAOCBDIVB",
// );
let token = localStorage.getItem("AuthToken");
const apiURL = "http://localhost:8080/";

let authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: token
  }
});

function App() {

  const getUser = async (uid) => {
    try {
      const result = await authAxios.get(`/users/${uid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async (body) => {
    try {
      const result = await authAxios.post(`/users/signup`, body);
      if(result==="User was added"){
        return getUser(body.id) // need to put auth somewhere too
      }
      else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = async (body) => {
    try {
      const result = await authAxios.post(`/users/login`, body);
      localStorage.setItem(
        "AuthToken",
        `Bearer ${result}`,
      );
      token = localStorage.getItem("AuthToken");
      authAxios = axios.create({
        baseURL: apiURL,
        headers: {
          Authorization: token
        }
      });
      return getUser(body.id);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (uid) => {
    try {
      const result = await authAxios.delete(`/users/${uid}/delete`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const getPosts = async () => {
    try {
      const result = await authAxios.get(`/posts`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const getPost = async (pid) => {
    try {
      const result = await authAxios.get(`/posts/${pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const createPost = async (uid) => {
    try {
      const result = await authAxios.post(`/users/${uid}/create-post`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (pid) => {
    try {
      const result = await authAxios.delete(`/posts/${pid}/delete`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const makeComment = async (props) => {
    try {
      const result = await authAxios.post(`/users/${props.uid}/comment/${props.pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const likePost = async (props) => {
    try {
      const result = await authAxios.post(`/users/${props.uid}/like/${props.pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const savePost = async (props) => {
    try {
      const result = await authAxios.post(`/users/${props.uid}/save/${props.pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const searchPost = async (query) => {
    try {
      const result = await authAxios.get(`/posts/search/${query}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route 
            exact path="/"
            render={(props) => (
              <Login {...props} getUser={getUser} createUser={createUser} loginUser={loginUser}/>
            )}
          
          />
          <Route 
            exact path="/home"
            render={(props) => (
              <Home {...props} createPost={createPost} getPosts={getPosts} searchPost={searchPost}/>
            )}
          />
          <Route 
            exact path="/post/:postId" 
            render={(props) => (
              <Post {...props} makeComment={makeComment} getPost={getPost} savePost={savePost} likePost={likePost}/>
            )}
          />
          <Route 
            exact path="/profile"
            render={(props) => (
              <Profile {...props} getPosts={getPosts} deletePost={deletePost} deleteUser={deleteUser}/>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
