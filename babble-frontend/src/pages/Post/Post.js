import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import MakeComment from "../../components/MakeComment/MakeComment.js";
import "./Post.css"

const tPost1 = {
    postId: "1",
    title: "What's up1",
    content: "srfghalhbvaihfbvaiabfvasd aposufdhvpausifv apiufvap iuasipduvbaspiu vasiufvb aipsuvbapsuovbapsuvbaspuvbapfuvbapiufvbaifudbvaipufvbapiuvbasipudvbpasudvb adasduipvba spiduvbq[9ufvp9auwrfbvasdivubaslfhv apsu poushdpiv pi sdivabsdipub piasuvb aiubpisubvipus bosufv baiasb piusb piausfb pausb piuabfp iuasbf ipasufb pasifduvbpiaub pisbpviubwdp ivuapiuebv apiubfvpiaubf vp iubfipvub apisbfv iapubwripyv piasdfbvapwi ur bpaud bvpiuawbrvpiuasb fvpiauwbp iruvbapisufdbv apiufdvbq ipwruvb apiusrbv ipquerbv piaeurbgpi qbwrpiugb vqpifvieprubvq iprub vqiperuvbqe iprvuqbripvqurbvqpiuwrb v ipwubv q #sad #lonely #rip #sad #lonely",
    tags: ["sad", "lonely"],
    likes: 20,
    comments: [
        {
            name: "Anonboy",
            comment: "omg i hate u so much"
        },
        {
            name: "Anongirl",
            comment: "wow what an absolute girlboss"
        },
    ],
    date: "April 20, 1969"

}

const tPost2 = {
    postId: "2",
    title: "What's up1",
    content: "Content1, content, content, content, content, content, content, content #sad #lonely",
    tags: ["sad", "lonely"],
    likes: 20000,
    comments: [
        {
            name: "Anonboy",
            comment: "omg i hate u so much"
        },
        {
            name: "Anongirl",
            comment: "wow what an absolute girlboss"
        },
    ],
    date: "April 20, 1969"
}

//replace with async method in future
const getPost = (postId) => {
    if(postId === "1"){
        return tPost1;
    }
    else {
        return tPost2;
    }
}

const Post = () => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const postId = useParams().postId;
    const [currPost,setCurrPost] = useState(getPost(postId));//will need to become asynchronous js at somepoint

    const [makeComment, setMakeComment] = useState(false);
    const openDialog = () => {
        setMakeComment(true);
    }

    const handleClose = () => {
        setMakeComment(false);
        setCurrPost(getPost(postId));
    }

    return (
        <div id = "main">
            <MakeComment open={makeComment} handleclose={handleClose}/>
            <div id="titleheader">
                <br></br>
                <div id = "title">
                    {currPost.title}
                </div>
                <div id = "date">
                    {currPost.date}
                </div>
                <br></br>
            </div>
            <div id = "content">
                {currPost.content}
            </div>
            <div id = "metaInfo">
                <ul id = "tags">
                    {currPost.tags.map((t) => {
                        return (
                            <li key={t + "key"}>{t}</li>
                        );
                    })}
                </ul>
                <div id = "likes">
                    liked by {currPost.likes} people
                </div>
                <button id = "likeButton" onClick={() => console.log("liked!")}>
                    Like
                </button>
                <button id = "savePostButton" onClick={() => console.log("saved!")}>
                    Save Post
                </button>
            </div>
            <button onClick={openDialog}>
                Make Comment
            </button>
            <div id = "comments">
                {currPost.comments.map((c) => {
                    return (
                        <div id = "comment" key={c.name + "key"}>
                            <div className="boldtext">
                                {c.name}
                            </div>
                            <div>
                                {c.comment}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button onClick = {goHome}>
                Home
            </button>
        </div>
    );
}

export default Post;