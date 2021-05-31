import './PostThumbnail.css'
import { useHistory } from "react-router-dom";

function PostThumbnail(props) {
    const history = useHistory();
    const goPost = (postId) => {
        history.push(`/post/${postId}`, props);
    }

    return (
        <div className="Thumbnail">
            <div className="Title">
                {props.title}
            </div>
            <div className="Content">
                {props.body}
            </div>
            <div className="Numbers">
                {props.likes} likes / {props.comments.length} comments
            </div>
            <div className="Button">
                <button onClick = {() => goPost(props.id)}>
                    Post {props.id}
                </button>
            </div>
        </div>
    )
}

export default PostThumbnail