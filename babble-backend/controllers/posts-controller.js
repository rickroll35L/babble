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

/* helper function to parse tags from body of post */
function parseTags(body) {
    const tagIndex = body.indexOf("#");
    let tags = [];
    if (tagIndex >= 0) {
        tags = body.substring(tagIndex, body.length).split("#");
        tags = tags.reduce((result, tag) => {
            tag = tag.trim();
            if (tag.length > 0) 
                result.push(tag);
            return result;
        }, []);
    }
    return tags;
}

/* Create a post, req.body: title, body  */
function createPost(req, res) {
    let { title, body } = req.body;
    const user = db.users[res.locals.userid];

    if (!title || !body ) {
        res.status(400).send("Error: Improperly formed request. Missing title or body.");
    }
    else {
        const feed = db.posts.feed;
        const tags = parseTags(body);
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
    if (req.params.query === undefined || req.params.query === '')
        res.status(401).send('Missing query');

    /* get all posts that have the query
       search in post's time, title, body (which includes tags), and comment
       bodies and times */
    const query = new RegExp(req.params.query.toString().toLowerCase());
    const feed = db.posts.feed;
    const search_result = feed.reduce((result, post) => {
        const inTitle = query.exec(post.title.toLowerCase());
        const inTime = query.exec(post.time.toLowerCase());
        const inBody = query.exec(post.body.toLowerCase());

        let inComments = false;
        const comments = post.comments;
        for (i = 0; i < comments.length; i++) {
            if(!comments[i].body || !comments[i].time){
                continue;
            }
            if (query.exec(comments[i].body.toLowerCase())
                || query.exec(comments[i].time.toLowerCase())) {
                inComments = true;
                break;
            }
        }

        if ( inTitle || inTime || inBody || inComments)
            if(!post.isDeleted)result.push(post);
        return result;
    }, []);

    res.status(200).json(search_result);
}

/* Get a post, req.params: post id (pid) */
function getPost(req, res) {
    const pid = parseInt(req.params.pid, 10);
    shared.verifyPID(req, res, () => {
        res.json(db.posts.feed[pid]);
    });
}
