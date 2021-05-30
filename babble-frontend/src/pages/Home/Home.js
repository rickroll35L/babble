import React,{ useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MakePost from "../../components/MakePost/MakePost.js";
import Feed from "../../components/Feed/Feed.js";

const Home = ({ createPost, getPosts, searchPost, logoutUser}) => {
    const history = useHistory();
    const [makePost, setMakePost] = useState(false);
    const [postList, setPostList] = useState([]);
    const goProfile = () => {
        history.push(`/profile`);
    }
    const goPost = (postId) => {
        history.push(`/post/${postId}`);
    }
    const goLogin = () => {
        logoutUser();
        history.push(`/`);
    }

    const openDialog = () => {
        setMakePost(true);
    }

    useEffect(() => {
        getPosts(setPostList);
    }, []);

    
    return (
        <div>
            <MakePost open={makePost} handleclose={() => setMakePost(false)} createPost={createPost}/>
            Home
            <button onClick = {goProfile}>
                Profile
            </button>
            <Feed posts={postList} searchPost={searchPost} setPostList={setPostList}/>
            <button onClick = {() => goPost(1)}>
                Post 1
            </button>
            <button onClick = {() => goPost(2)}>
                Post 2
            </button>
            <button onClick = {goLogin}>
                Logout
            </button>
            <button onClick={openDialog}>
                Make Post
            </button>
        </div>
        
    );
}

export default Home;