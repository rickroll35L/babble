import PostThumbnail from '../PostThumbnail/PostThumbnail'

const tProfile1 = {
    postId: 1,
    title: "100chars alghld;asjlgjdsaljf dsjalfkjdskl;ajf;ldsjalfjdskajlfdsjaf dsl;ajf;ljdsa;ljg;ldsajgsjl fjds",
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

const feedPostsArray = [tProfile1, tProfile2];


function Feed() {
    return (
        <div>
            {feedPostsArray.map(post => <PostThumbnail {...post} />)}
        </div>
    )
}

export default Feed
