import PostThumbnail from '../PostThumbnail/PostThumbnail'

const tProfile1 = {
    id: 1,
    title: "What's up1",
    body: "Content1, content, content, content, content, content, content, content",
    likes: "20",
    comments: [
        {
            id: 0,
            poster: "Anonboy",
            comment: "omg i hate u so much"
        },
        {
            id: 1,
            poster: "Anongirl",
            comment: "wow what an absolute girlboss"
        },
    ],
}

const tProfile2 = {
    id: 2,
    title: "What's up2",
    body: "Content2, content, content, content, content, content, content, content",
    likes: "20000",
    comments: [
        {
            id: 0,
            poster: "Anonboy",
            comment: "omg i hate u so much"
        },
        {
            id: 1,
            poster: "Anongirl",
            comment: "wow what an absolute girlboss"
        },
    ],
}

function Feed({ posts }) {
    return (
        <div>
            {posts.map((p) => 
                <PostThumbnail {...p} key={p.id + "feedposts"} postStats={true}/>
            )}
            {/*<PostThumbnail {...tProfile1}/>
            <PostThumbnail {...tProfile2}/>*/}
        </div>
    );
}

export default Feed
