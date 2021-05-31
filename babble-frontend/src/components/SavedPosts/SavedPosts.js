import React, {useState, useEffect} from 'react'
import PostThumbnail from '../PostThumbnail/PostThumbnail'
import './SavedPosts.css'

const SavedPosts = ({getSavedPosts}) => {
    const [savedPosts, setSavedPosts] = useState([]);
    useEffect(() => {
        getSavedPosts(setSavedPosts);
    },[]);

    const post5 = {
        id: 5,
        title: "This is a saved post",
        body: "It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.",
        likes: 910,
        comments: ["","","","","",""],
    }

    const post6 = {
        id: 6,
        title: "Another saved post exmaple",
        content: "Lorem ipsum is typically a corrupted version of 'De finibus bonorum et malorum', a 1st century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin.",
        likes: 11,
        comments: ["","","","","","","","","","","",""],
    }

    const savedPostsArray = [post5, post6];

    return (
        <div className="saved-posts-container">
            <div className="saved-posts-title">Saved Posts</div>
            {savedPostsArray.map(post => <PostThumbnail {...post} key={post.id + "savetest"}/>)}
            {savedPosts ? savedPosts.map(post => <PostThumbnail {...post} key={post.id + "save"}/>) : <></>}
        </div>
    );
}

export default SavedPosts