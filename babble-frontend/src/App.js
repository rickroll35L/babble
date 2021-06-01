import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useCallback } from "react";
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
const apiURL = "";

let authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    authentication: token
  }
});

function App() {
  const [loginInfo, setLoginInfo] = useState({});

  // authentication calls
  const createUser = useCallback( async (body) => {
    try {
      const result = await axios.post(`/enter/signup`, body);
      console.log(result);
      alert("Account created! Please go to login.");
      return true;
    } catch (err) {
      console.log(err);
      alert(err);
      return false;
    }
  });

  const loginUser = useCallback( async ({body, callback}) => {
    try {
      const result = await axios.post(`/enter/login`, body);
      console.log(result);
      localStorage.setItem(
        "AuthToken",
        JSON.stringify(result.data),
      );
      token = localStorage.getItem("AuthToken");
      console.log(token);
      authAxios = axios.create({
        baseURL: apiURL,
        headers: {
          authentication: token
        }
      });
      setLoginInfo(body);
      localStorage.setItem(
        "email",
        body.email
      );
      localStorage.setItem(
        "pswd",
        body.password
      );//not secure at all but im v lazy rn
      callback();
    } catch (err) {
      console.log(err);
      alert("Invalid Login: " + err);
    }
  });

  const logoutUser = useCallback( async () => {
    try {
      const result = await authAxios.post(`/user/logout`);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  });

  // user info calls
  const deleteUser = useCallback( async () => {
    try {
      const body = {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("pswd"),
      };
      console.log(body);
      const delAxios = axios.create({
        baseURL: apiURL,
        headers: {
          authentication: localStorage.getItem("AuthToken"),
          email: body.email,
          password: body.password,
        },
      });
      const result = await delAxios.delete(`/user/delete-account`);
      if(result.status===200){
        alert("Deleted!")
      }else{
        alert("Deletion invalid")
      }
      return logoutUser();
    } catch (err) {
      console.log(err);
      return false;
    }
  });

  const changePassword = useCallback( async (newP) => {
    try {
      const body = {
        email: localStorage.getItem("email"),
        currentPassword: localStorage.getItem("pswd"),
        newPassword: newP
      }
      const result = await authAxios.post(`/user/change-password`, body);
      console.log(result);
      return logoutUser();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  });

  const changeEmail = useCallback( async (newE) => {
    try {
      const body = {
        currentEmail: localStorage.getItem("email"),
        newEmail: newE,
        password: localStorage.getItem("pswd"),
      }
      const result = await authAxios.post(`/user/change-email`, body);
      return logoutUser();
    } catch (err) {
      console.log(err);
      alert(err);
      return false;
    }
  });

  const getSavedPosts = useCallback( async (callback) => {
    try {
      const result = await authAxios.get(`/user/saved-posts`);
      callback(result.data);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  });

  const getMyPosts = useCallback( async (callback) => {
    try {
      const result = await authAxios.get(`/user/my-posts`);
      callback(result.data);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  });

  // posts controls
  const getPosts = useCallback( async (callback) => {
    try {
      const result = await authAxios.get(`/posts/feed`);
      callback(result.data);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  });

  const getPost = useCallback( async ({set, pid}) => {
    try {
      const result = await authAxios.get(`/posts/get-post/${pid}`);
      set(result.data);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  });

  const createPost = useCallback( async (post) => {
    try {
      const result = await authAxios.post(`/posts/create-post`, post);
      alert("Posted! Please reload page.")
      return true;
    } catch (err) {
      console.log(err);
      alert(err);
      return false;
    }
  });

  const deletePost = useCallback( async (pid) => {
    try {
      const result = await authAxios.delete(`/user/delete-post/${pid}`);
      alert("Post deleted! Please refresh to update.")
      return true;
    } catch (err) {
      console.log(err);
      alert(err);
      return false;
    }
  });

  const searchPost = useCallback( async ({query, callback}) => {
    try {
      const result = await authAxios.get(`/posts/search/${query}`);
      callback(result.data);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  });

  // post interaction

  const createComment = useCallback( async ({pid, body}) => {
    try {
      const result = await authAxios.post(`/posts/comment/${pid}`, body);
      alert("Comment posted! Please refresh if you do not see it.");
      return true;
    } catch (err) {
      console.log(err);
      alert(err);
      return false;
    }
  });

  const likePost = useCallback( async (pid) => {
    try {
      const result = await authAxios.post(`/posts/like/${pid}`);
      alert("Post liked! Please refresh if not seen");
      return true;
    } catch (err) {
      console.log(err);
      alert(err);
      return false;
    }
  });

  const savePost = useCallback( async (pid) => {
    try {
      const result = await authAxios.post(`/posts/save-post/${pid}`);
      alert("Post saved!")
      return true;
    } catch (err) {
      console.log(err);
      alert(err);
      return false;
    }
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route 
            exact path="/"
            render={(props) => (
              <Login {...props} 
                createUser={createUser} 
                loginUser={loginUser}
              />
            )}
          />
          <Route 
            exact path="/home"
            render={(props) => (
              <Home {...props} 
                createPost={createPost} 
                getPosts={getPosts} 
                searchPost={searchPost}
                logoutUser={logoutUser}
              />
            )}
          />
          <Route 
            exact path="/home/:q"
            render={(props) => (
              <Home {...props} 
                createPost={createPost} 
                getPosts={getPosts} 
                searchPost={searchPost}
                logoutUser={logoutUser}
              />
            )}
          />
          <Route 
            exact path="/post/:postId" 
            render={(props) => (
              <Post post={props}
                createComment={createComment} 
                getPost={getPost} 
                savePost={savePost} 
                likePost={likePost}
              />
            )}
          />
          <Route 
            exact path="/profile"
            render={(props) => (
              <Profile {...props} 
                loginInfo={loginInfo}
                deletePost={deletePost} 
                deleteUser={deleteUser} 
                changePassword={changePassword}
                changeEmail={changeEmail}
                getSavedPosts={getSavedPosts}
                getMyPosts={getMyPosts}
                logoutUser={logoutUser}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
