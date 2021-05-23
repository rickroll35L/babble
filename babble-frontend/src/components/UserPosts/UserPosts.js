import React from 'react'
import PostThumbnail from '../PostThumbnail/PostThumbnail'
import './UserPosts.css'


const UserPosts = () => {

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

    const userPostsArray = [post3, post4];

    return (
        <div className="user-posts-container">
            <div>User Posts</div>
            {userPostsArray.map(post => <PostThumbnail {...post} />)}
        </div>
    );
}

export default UserPosts