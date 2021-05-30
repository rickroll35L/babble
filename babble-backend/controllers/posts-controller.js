const db = require('../database/db');
const shared = require('./shared');

module.exports = {
    getFeed,
    createPost,
    writeComment,
    likePost,
    savePost,
    search,
    getPost
}

/*************************************** */
/* Get the userid with res.locals.userid */
/*************************************** */

/* Get the posts feed (all posts) */
function getFeed(_req, res) {
    res.status(200);
    res.json(db.posts.feed.filter(post => !post.isDeleted));
}

/* Create a post, req.body: title, body, tags (array of tags) */
function createPost(req, res) {
    const { title, body, tags } = req.body;
    const user = db.users[res.locals.userid];

    if (!title || !body || !tags) {
        res.status(400).send("Error: Improperly formed request. Missing title, body, or tags.");
    }
    else {
        const feed = db.posts.feed;
        const post = {
            id: feed.length,
            time: Date(),
            title,
            body,
            likes: 0,
            isDeleted: false,
            poster: res.locals.userid,
            tags,
            comments: [],
        }
        feed.push(post);
        user.posts.push(post.id);
        db.writePosts();
        db.writeUsers();
        res.status(200).send("Post created.");
    }
}

/* Make a comment, req.body: body, poster, req.params: post id (pid) */
function writeComment(req, res) {     
    shared.verifyPID(req, res, () => {
        const {body, poster} = req.body;
        const post = db.posts.feed[req.params.pid];
        const comment = {
            id: post.comments.length,
            time: Date(),
            poster,
            body,
        }
        post.comments.push(comment);
        db.writePosts();
        res.send("Commented on post.");
    });
}

/* Like a post, req.params: post id (pid) */
function likePost(req, res) {
    shared.verifyPID(req, res, () => {
        const post = db.posts.feed[req.params.pid];
        post.likes++;
        db.writePosts();
        res.send("Liked post.");
    });
}

/* Save post, req.params: post index (pid) */
function savePost(req, res) {
    shared.verifyPID(req, res, () => {
        const user = db.users[res.locals.userid];
        const post = db.posts.feed[req.params.pid];
        if (!user.saved.includes(post.id)) {
            user.saved.push(post.id);
            db.writeUsers();
        }
        res.send("Saved post.")
    })
}

/* Search for posts, req.params: query (what to search by) */
function search(req, res) {
    // TODO
    res.send('searched posts');
}

/* Get a post, req.params: post id (pid), for debugging purposes */
function getPost(req, res) {
    const pid = parseInt(req.params.pid, 10);
    shared.verifyPID(req, res, () => {
        res.json(db.posts[pid]);
    });
}
