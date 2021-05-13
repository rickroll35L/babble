import PostThumbnail from '../PostThumbnail/PostThumbnail'

const tProfile = {
    title: "What's up",
    content: "Content, content, content, content, content, content, content, content",
    likes: "2000",
    comments: "10",
}

function Feed() {
    return (
        <div className="Feed">
            <div className="Navigation">

            </div>
            <div className="PostBody">
                <PostThumbnail title={tProfile.title} content={tProfile.content} likes={tProfile.likes} comments={tProfile.comments}/>
            </div>
            <div className="Buttons">

            </div>
        </div>
    )
}

export default Feed
