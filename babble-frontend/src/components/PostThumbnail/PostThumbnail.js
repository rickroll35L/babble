import './PostThumbnail.css'
import { useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';

function PostThumbnail(props) {
    const history = useHistory();
    const goPost = (postId) => {
        history.push(`/post/${postId}`, props);
    }

    return (
        <div className="thumbnail">
            <div className="post-content" onClick={() => goPost(props.id)}>
                <div className="post-title">{props.title}</div>
                <div className="post-description">{props.body}</div>
            </div>

            {props.deletePost ? 
                (<div className="delete">
                    <DeleteIcon 
                    onClick={() => props.deletePost(props.id)}
                    style={{ 
                        fontSize: 100

                    }}
                    />
                </div>)
            : <></>}

            <div className="line"></div>

            <div className="stats">
                <div className="post-likes">Likes {props.likes}</div>
                <div className="post-comments">Comments {props.comments.length}</div>
            </div>

        </div>
    )
}

export default PostThumbnail