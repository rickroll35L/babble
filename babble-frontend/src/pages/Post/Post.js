import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'


const Post = () => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const location = useLocation();
    const postId = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

    return (
        <div>
            Post {postId}
            <button onClick = {goHome}>
                Home
            </button>
        </div>
    );
}

export default Post;