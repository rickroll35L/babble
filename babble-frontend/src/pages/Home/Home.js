import React from "react";
import { useHistory } from "react-router-dom";
import Feed from "../../components/Feed/Feed.js";

const Home = () => {
    const history = useHistory();
    const goProfile = () => {
        history.push(`/profile`);
    }
    const goPost = (postId) => {
        history.push(`/post/${postId}`);
    }
    const goLogin = () => {
        history.push(`/`);
    }

    
    return (
        <div>
            Home
            <button onClick = {goProfile}>
                Profile
            </button>
            <Feed/>
            <button onClick = {() => goPost(1)}>
                Post 1
            </button>
            <button onClick = {() => goPost(2)}>
                Post 2
            </button>
            <button onClick = {goLogin}>
                Logout
            </button>
        </div>
        
    );
}

export default Home;