import React, {useState, useEffect} from 'react'
import PostThumbnail from '../PostThumbnail/PostThumbnail'
import './UserPosts.css'


const UserPosts = ({posts,deletePost,getPostsFromIds}) => {
    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        const req = {
            ids: posts,
            set: setUserPosts
        };
        getPostsFromIds(req);
    },[posts, getPostsFromIds]);

    const post3 = {
        postId: 3,
        title: "A post the user made",
        content: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        likes: "42",
        comments: "6",
    }

    const post4 = {
        postId: 4,
        title: "Another post that user made",
        content: "Lorem ipsum may be used as a placeholder before final copy is available.",
        likes: "42069",
        comments: "110",
    }

    const post7 = {
        postId: 7,
        title: "User made post",
        content: "This post only exists to see if the vertical scrolling works",
        likes: "987",
        comments: "876",
    }

    const userPostsArray = [post3, post4, post7];
    

    return (
        <div className="user-posts-container">
            <div>User Posts</div>
            {userPostsArray.map(post => <PostThumbnail {...post} deletePost={deletePost} key={post.postId}/>)}
            {userPosts ? userPosts.map(post => <PostThumbnail {...post} key={post.id}/>) : <></>}
        </div>
    );
}

export default UserPosts