import React,{ useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MakePost from "../../components/MakePost/MakePost.js";
import Feed from "../../components/Feed/Feed.js";
import Navbar from "../../components/Navbar/Navbar.js"
import './Home.css';

const Home = ({ createPost, getPosts, searchPost, logoutUser}) => {
    const history = useHistory();
    const [makePost, setMakePost] = useState(false);
    const [postList, setPostList] = useState([]);

    const goPost = (postId) => {
        history.push(`/post/${postId}`);
    }

    const openDialog = () => {
        setMakePost(true);
    }

    useEffect(() => {
        getPosts(setPostList);
    }, []);
    
    return (
        <div className="home-container">

            <Navbar logoutUser={logoutUser} searchPost={searchPost} setPostList={setPostList}/>

            <div>
                <Feed posts={postList} />
            </div>

            <div className="old-stuff">
                <MakePost open={makePost} handleclose={() => setMakePost(false)} createPost={createPost}/>
                Home
                <button onClick = {() => goPost(1)}>Post 1</button>
                <button onClick = {() => goPost(2)}>Post 2</button>
                <button onClick={openDialog}>Make Post</button>
            </div>
        </div>
        
    );
}

export default Home;