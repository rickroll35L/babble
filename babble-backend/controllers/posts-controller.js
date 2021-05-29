const db = require('../database/db');

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
function getFeed (req, res) {
    res.status(200);
    res.json(db.posts.feed.filter(post => !post.isDeleted));
}

/* Create a post, req.body: title, body, tags (array of tags) */
function createPost (req, res) {
    // TODO
    res.send('post created');
}

/* Make a comment, req.body: comment, query: post id (pid) */
function writeComment (req, res) {
    // TODO
    res.send('wrote comment');
}

/* Like a post, query: post id (pid) */
function likePost (req, res) {
    // TODO
    res.send('liked post');
}

/* Save post, query: post index (pid) */
function savePost (req, res) {
    // TODO
    res.send('save post');
}

/* Search for posts, query: query (what to search by) */
function search (req, res) {
    // TODO
    res.send('searched posts');
}

/* Get a post, query: post id (pid), for debugging purposes */
function getPost (req, res) {
    const pid = parseInt(req.params.pid, 10);
    if (!req.params.pid) {
        res.status(400);
        res.send("Error: Missing parameter 'pid'");
    }
    else if (!db.posts[pid] || db.posts[pid].isDeleted) {
        console.log(db.posts[pid]);     // suggestion: if post is deleted, why print it
        res.status(404);
        res.send("Error: Post not found");
    }
    else {
        res.status(200);
        res.json(db.posts[pid]);
    }
}
