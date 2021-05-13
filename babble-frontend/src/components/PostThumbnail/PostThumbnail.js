import './PostThumbnail.css'

function PostThumbnail(props) {
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
        </div>
    )
}

export default PostThumbnail