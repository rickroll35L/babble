import PostThumbnail from '../PostThumbnail/PostThumbnail'

const tProfile1 = {
    postId: 1,
    title: "What's up1",
    content: "Content1, content, content, content, content, content, content, content",
    likes: "20",
    comments: "10",
}

const tProfile2 = {
    postId: 2,
    title: "What's up2",
    content: "Content2, content, content, content, content, content, content, content",
    likes: "20000",
    comments: "10",
}

function Feed() {
    return (
        <div>
            <div className="Navigation">

            </div>
            <PostThumbnail {...tProfile1}/>
            <PostThumbnail {...tProfile2}/>
        </div>
    )
}

export default Feed
