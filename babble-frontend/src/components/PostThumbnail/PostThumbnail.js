import './PostThumbnail.css'
import { useHistory } from "react-router-dom";

function PostThumbnail(props) {
    const history = useHistory();
    const goPost = (postId) => {
        history.push(`/post/${postId}`);
    }

    return (
        <div className="thumbnail">
            <div className="post-content" onClick={() => goPost(props.postId)}>
                <div className="post-title">
                    {props.title}
                </div>
                <div className="post-description">
                    {props.content}
                </div>
            </div>

            <div className="line"></div>

            <div className="stats">
                <div>Saved</div>
                <div className="post-likes">Likes {props.likes}</div>
                <div>Comments {props.comments}</div>
            </div>
        </div>
    )
}

export default PostThumbnail