import React,{ useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import MakePost from "../../components/MakePost/MakePost.js";
import Feed from "../../components/Feed/Feed.js";
import Navbar from "../../components/Navbar/Navbar.js"
import './Home.css';

const Home = ({ createPost, getPosts, searchPost, logoutUser}) => {
    const params = useParams();
    const history = useHistory();
    // const [makePost, setMakePost] = useState(false);
    const [postList, setPostList] = useState([]);

    const goPost = (postId) => {
        history.push(`/post/${postId}`);
    }

    // const openDialog = () => {
    //     setMakePost(true);
    // }
    const search = (query) => {
        const req = {
            query: query,
            callback: setPostList
        };
        searchPost(req);
    };
    useEffect(() => {
        getPosts(setPostList);
        if (params.q)
            search(params.q);
    }, []);
    
    
    return (
        <div className="home-container">

            <Navbar createPost={createPost} logoutUser={logoutUser} searchPost={searchPost}/>

            <div>
                <Feed posts={postList} />
            </div>

            {/*<div className="old-stuff">
                <MakePost open={makePost} handleclose={() => setMakePost(false)} createPost={createPost}/>
                Home 
                <button onClick = {() => goPost(1)}>Post 1</button>
                <button onClick = {() => goPost(2)}>Post 2</button>
                <button onClick={openDialog}>Make Post</button>
            </div>*/}
        </div>
        
    );
}

export default Home;