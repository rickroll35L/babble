import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
    Authorization: token
  }
});

function App() {
  const [ user, setUser ] = useState({});
  const history = useHistory();

  const getUser = useCallback( async (uid) => {
    try {
      const result = await authAxios.get(`/users/${uid}`, {uid: uid});
      setUser(result);
      console.log(user);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const createUser = useCallback( async (body) => {
    try {
      const result = await axios.post(`/users/signup`, body);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const loginUser = useCallback( async (body) => {
    try {
      const result = await axios.post(`/users/login`, body);
      console.log(result);
      localStorage.setItem(
        "AuthToken",
        `Bearer ${result.data.token}`,
      );
      token = localStorage.getItem("AuthToken");
      authAxios = axios.create({
        baseURL: apiURL,
        headers: {
          Authorization: token
        }
      });
      getUser(result.data.hash_id);
      if(user){
        history.push(`/home`);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const deleteUser = useCallback( async () => {
    try {
      const result = await authAxios.delete(`/users/${user.id}/delete`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const getPosts = useCallback( async (callback) => {
    try {
      const result = await authAxios.get(`/posts`);
      callback(result);
    } catch (err) {
      console.log(err);
    }
  });

  const getPost = useCallback( async ({set, pid}) => {
    try {
      const result = await authAxios.get(`/posts/${pid}`);
      set(result);
    } catch (err) {
      console.log(err);
    }
  });

  const getPostsFromIds = useCallback( async ({set, ids}) => {
    try {
      if(!ids){
        console.log("No id: getPostsFromIds")
        return;
      }
      let promises = [];
      for (let i = 0; i < ids.length; i++) {
        promises.push(
          authAxios.get(`/posts/${ids[i]}`)
        );
      }
      const res = await Promise.all(promises);
      set(res);
    } catch (err) {
      console.log(err);
    }

  });

  const createPost = useCallback( async (post) => {
    try {
      const result = await authAxios.post(`/users/${user.id}/create-post`, post);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const deletePost = useCallback( async (pid) => {
    try {
      const result = await authAxios.delete(`/posts/${pid}/delete`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const createComment = useCallback( async (props) => {
    try {
      const result = await authAxios.post(`/users/${user.id}/comment/${props.pid}`, props.body);
      alert("Comment posted! Please refresh if you do not see it.")
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const likePost = useCallback( async (pid) => {
    try {
      const result = await authAxios.post(`/users/${user.id}/like/${pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const savePost = useCallback( async (pid) => {
    try {
      const result = await authAxios.post(`/users/${user.id}/save/${pid}`);
      return result;
    } catch (err) {
      console.log(err);
    }
  });

  const searchPost = useCallback( async (query) => {
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
              <Post {...props} createComment={createComment} getPost={getPost} savePost={savePost} likePost={likePost}/>
            )}
          />
          <Route 
            exact path="/profile"
            render={(props) => (
              <Profile {...props} getPostsFromIds={getPostsFromIds} deletePost={deletePost} deleteUser={deleteUser} user={user}/>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
