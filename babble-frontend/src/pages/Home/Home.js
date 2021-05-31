import React,{ useState } from "react";
import { useHistory } from "react-router-dom";
import MakePost from "../../components/MakePost/MakePost.js";
import Feed from "../../components/Feed/Feed.js";
import './Home.css'

const Home = () => {
    const history = useHistory();
    const [makePost, setMakePost] = useState(false);
    const goProfile = () => {
        history.push(`/profile`);
    }
    const goPost = (postId) => {
        history.push(`/post/${postId}`);
    }
    const goLogin = () => {
        history.push(`/`);
    }

    const openDialog = () => {
        setMakePost(true);
    }

    
    return (
        <div className="home-container">

            {/*Navbar would go here probably*/}

            <div>
                <Feed />
            </div>

            <div className="old-stuff">
                <MakePost open={makePost} handleclose={() => setMakePost(false)} />
                <button onClick = {goProfile}>Profile</button>
                <button onClick = {() => goPost(1)}>Post 1</button>
                <button onClick = {() => goPost(2)}>Post 2</button>
                <button onClick = {goLogin}>Logout</button>
                <button onClick={openDialog}>Make Post</button>
            </div>
            
        </div>
        
    );
}

export default Home;