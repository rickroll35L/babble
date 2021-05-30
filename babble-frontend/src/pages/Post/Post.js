import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import MakeComment from "../../components/MakeComment/MakeComment.js";
import "./Post.css"

const tPost1 = {
    id: 1,
    title: "What's up1",
    body: "srfghalhbvaihfbvaiabfvasd aposufdhvpausifv apiufvap iuasipduvbaspiu vasiufvb aipsuvbapsuovbapsuvbaspuvbapfuvbapiufvbaifudbvaipufvbapiuvbasipudvbpasudvb adasduipvba spiduvbq[9ufvp9auwrfbvasdivubaslfhv apsu poushdpiv pi sdivabsdipub piasuvb aiubpisubvipus bosufv baiasb piusb piausfb pausb piuabfp iuasbf ipasufb pasifduvbpiaub pisbpviubwdp ivuapiuebv apiubfvpiaubf vp iubfipvub apisbfv iapubwripyv piasdfbvapwi ur bpaud bvpiuawbrvpiuasb fvpiauwbp iruvbapisufdbv apiufdvbq ipwruvb apiusrbv ipquerbv piaeurbgpi qbwrpiugb vqpifvieprubvq iprub vqiperuvbqe iprvuqbripvqurbvqpiuwrb v ipwubv q #sad #lonely #rip #sad #lonely",
    tags: ["sad", "lonely"],
    likes: 20,
    comments: [
        {
            id: 0,
            name: "Anonboy",
            comment: "omg i hate u so much"
        },
        {
            id: 1,
            name: "Anongirl",
            comment: "wow what an absolute girlboss"
        },
    ],
    time: "April 20, 1969"

}

const tPost2 = {
    id: 2,
    title: "What's up1",
    body: "Content1, content, content, content, content, content, content, content #sad #lonely",
    tags: ["sad", "lonely"],
    likes: 20000,
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
    time: "April 20, 1969"
}

//replace with async method in future
const testPost = (postId) => {
    if(postId === "1"){
        return tPost1;
    }
    else {
        return tPost2;
    }
}

const Post = ({getPost, savePost, createComment, likePost}) => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const postId = useParams().postId;
    const [currPost,setCurrPost] = useState(testPost(postId));//will need to become asynchronous js at somepoint
    useEffect(() => {
        console.log("postId")
        const req = {
            pid: postId,
            set: setCurrPost
        };
        getPost(req);
        console.log("hi");
        console.log(currPost);
    },[postId, getPost])

    const [makeComment, setMakeComment] = useState(false);
    const openDialog = () => {
        setMakeComment(true);
    }

    const handleClose = () => {
        setMakeComment(false);
    }

    return (
        <div id = "main">
            <MakeComment open={makeComment} handleclose={handleClose} createComment={createComment} postId={postId}/>
            <div id="titleheader">
                <br></br>
                <div id = "title">
                    {currPost.title  ? currPost.title : ""}
                </div>
                <div id = "date">
                    {currPost.time}
                </div>
                <br></br>
            </div>
            <div id = "content">
                {currPost.body}
            </div>
            <div id = "metaInfo">
                <ul id = "tags">
                    {currPost.tags ? currPost.tags.map((t) => {
                        return (
                            <li key={t + "key"}>{t}</li>
                        );
                    }) : <></>}
                </ul>
                <div id = "likes">
                    liked by {currPost.likes} people
                </div>
                <button id = "likeButton" onClick={() => likePost(postId)}>
                    Like
                </button>
                <button id = "savePostButton" onClick={() => savePost(postId)}>
                    Save Post
                </button>
            </div>
            <button onClick={openDialog}>
                Make Comment
            </button>
            <div id = "comments">
                {currPost.comments ? currPost.comments.map((c) => {
                    return (
                        <div id = "comment" key={c.id + "commentkey"}>
                            <div className="boldtext">
                                {c.poster}
                            </div>
                            <div>
                                {c.body}
                            </div>
                        </div>
                    );
                }) : <></>}
            </div>
            <button onClick = {goHome}>
                Home
            </button>
        </div>
    );
}

export default Post;