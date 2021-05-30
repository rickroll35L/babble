import React, {useState, useEffect} from 'react'
import PostThumbnail from '../PostThumbnail/PostThumbnail'
import './UserPosts.css'


const UserPosts = ({getMyPosts,deletePost}) => {
    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        getMyPosts(setUserPosts);
    },[]);

    const post3 = {
        id: 3,
        title: "A post the user made",
        body: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        likes: 42,
        comments: ["","","","","",""],
    }

    const post4 = {
        id: 4,
        title: "Another post that user made",
        body: "Lorem ipsum may be used as a placeholder before final copy is available.",
        likes: "42069",
        comments: ["","","","","",""],
    }

    const post7 = {
        id: 7,
        title: "User made post",
        body: "This post only exists to see if the vertical scrolling works",
        likes: 987,
        comments: ["","","","","",""],
    }

    const userPostsArray = [post3, post4, post7];
    

    return (
        <div className="user-posts-container">
            <div>User Posts</div>
            {userPostsArray.map(post => <PostThumbnail {...post} key={post.id + "usertest"}/>)}
            {userPosts ? userPosts.map((post) => {
                return (<div key={post.id + "mypost"}>
                    <PostThumbnail {...post} />
                    <button onClick={deletePost}>Delete Post</button>
                </div>);
            }) : <></>}
        </div>
    );
}

export default UserPosts