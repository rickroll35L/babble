import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import MakeComment from "../../components/MakeComment/MakeComment.js";
import Navbar from "../../components/Navbar/Navbar.js"
import "./Post.css"

// const tPost1 = {
//     id: 1,
//     title: "What's up1",
//     body: "srfghalhbvaihfbvaiabfvasd aposufdhvpausifv apiufvap iuasipduvbaspiu vasiufvb aipsuvbapsuovbapsuvbaspuvbapfuvbapiufvbaifudbvaipufvbapiuvbasipudvbpasudvb adasduipvba spiduvbq[9ufvp9auwrfbvasdivubaslfhv apsu poushdpiv pi sdivabsdipub piasuvb aiubpisubvipus bosufv baiasb piusb piausfb pausb piuabfp iuasbf ipasufb pasifduvbpiaub pisbpviubwdp ivuapiuebv apiubfvpiaubf vp iubfipvub apisbfv iapubwripyv piasdfbvapwi ur bpaud bvpiuawbrvpiuasb fvpiauwbp iruvbapisufdbv apiufdvbq ipwruvb apiusrbv ipquerbv piaeurbgpi qbwrpiugb vqpifvieprubvq iprub vqiperuvbqe iprvuqbripvqurbvqpiuwrb v ipwubv q #sad #lonely #rip #sad #lonely",
//     tags: ["sad", "lonely"],
//     likes: 20,
//     comments: [
//         {
//             id: 0,
//             poster: "Anonboy",
//             body: "omg i hate u so much"
//         },
//         {
//             id: 1,
//             name: "Anongirl",
//             body: "wow what an absolute girlboss"
//         },
//     ],
//     time: "April 20, 1969"

// }

// const tPost2 = {
//     id: 2,
//     title: "What's up1",
//     body: "Content1, content, content, content, content, content, content, content #sad #lonely",
//     tags: ["sad", "lonely"],
//     likes: 20000,
//     comments: [
//         {
//             id: 0,
//             poster: "Anonboy",
//             body: "omg i hate u so much"
//         },
//         {
//             id: 1,
//             poster: "Anongirl",
//             body: "wow what an absolute girlboss"
//         },
//     ],
//     time: "April 20, 1969"
// }

// //replace with async method in future
// const testPost = (postId) => {
//     if(postId === "1"){
//         return tPost1;
//     }
//     else {
//         return tPost2;
//     }
// }

const Post = ({getPost, savePost, createComment, likePost, post, createPost, searchPost, logoutUser}) => {
    const history = useHistory();
    const goHome = () => {
        history.push(`/home`);
    }
    const postId = useParams().postId;
    const [currPost,setCurrPost] = useState({});//will need to become asynchronous js at somepoint
    useEffect(() => {
        if(post.id){
            setCurrPost(post);
        }
        const req = {
            pid: postId,
            set: setCurrPost
        };
        getPost(req);
    },[postId, getPost])

    const [makeComment, setMakeComment] = useState(false);
    const openDialog = () => {
        setMakeComment(true);
    }

    const handleClose = () => {
        setMakeComment(false);
    }

    const doLike = (postId) => {
        likePost(postId);
        window.location.reload();
    }

    return (
        <div className="post-page-container">
            <Navbar createPost={createPost} logoutUser={logoutUser} searchPost={searchPost}/>
            <div className="post-container">
                <MakeComment open={makeComment} handleclose={handleClose} createComment={createComment} postId={postId}/>

                <div className="content-container">
                    <div className="date">Posted {currPost.time}</div>
                    <div className="post-title">{currPost.title ? currPost.title : ""}</div>
                    <div className="content">{currPost.body}</div>
                </div>

                <div className = "tags-list">
                    <ul id = "tags">
                        {currPost.tags ? currPost.tags.map((t) => {
                            return (
                                <li key={t + "key"}>{t}</li>
                            );
                        }) : <></>}
                    </ul>
                </div>

                <div className="post-interactions">
                    <button className="save-button" onClick={() => savePost(postId)}>
                        Save This Post
                    </button>
                    <button className="like-button" onClick={() => doLike(postId)}>
                        Like This Post <div>{currPost.likes}</div>
                    </button>
                    <button className="comment-button" onClick={openDialog}>
                        Make a Comment
                    </button>
                </div>
                
                <div className="comments">
                    {currPost.comments ? currPost.comments.map((c) => {
                        return (
                            <div id = "comment" key={c.id + "commentkey"}>
                                <div className="commenter">{c.poster}</div>
                                <div className="comment-body">{c.body}</div>
                            </div>
                        );
                    }) : <></>}
                </div>


                {/*<div className="old-stuff">
                    <button onClick={goHome}>Home</button>
                </div>*/}

            </div>
        </div>
    );
}

export default Post;