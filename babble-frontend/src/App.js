import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Post from "./pages/Post/Post.js";
import Profile from "./pages/Profile/Profile.js";


function App() {
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
