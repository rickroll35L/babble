import './PostThumbnail.css'
import { useHistory } from "react-router-dom";

function PostThumbnail(props) {
    const history = useHistory();
    const goPost = (postId) => {
        history.push(`/post/${postId}`);
    }

    return (
        <div className="Thumbnail">
            <div className="Title">
                {props.title}
            </div>
            <div className="Content">
                {props.content}
            </div>
            <div className="Numbers">
                {props.likes} likes / {props.comments} comments
            </div>
            <div className="Button">
                <button onClick = {() => goPost(props.postId)}>
                    Post {props.postId}
                </button>
            </div>
        </div>
    )
}

export default PostThumbnail