import React from 'react'
import PostThumbnail from '../PostThumbnail/PostThumbnail'
import './SavedPosts.css'

const SavedPosts = () => {

    const post5 = {
        postId: 5,
        title: "This is a saved post",
        content: "It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.",
        likes: "910",
        comments: "21",
    }

    const post6 = {
        postId: 6,
        title: "Another saved post exmaple",
        content: "Lorem ipsum is typically a corrupted version of 'De finibus bonorum et malorum', a 1st century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin.",
        likes: "11",
        comments: "11037",
    }

    return (
        <div>
            <PostThumbnail {...post5} />
            <PostThumbnail {...post6} />
        </div>
    );
}

export default SavedPosts