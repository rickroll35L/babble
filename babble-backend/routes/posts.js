const express = require('express');
const posts_router = express.Router();
const { isAuth } = require('../authentication/auth');
const { auth_errorHandler } = require('../authentication/auth-errorhandler');
const {
    getFeed,
    createPost,
    writeComment,
    likePost,
    savePost,
    search,
    getPost
} = require('../controllers/posts-controller');

module.exports = posts_router;

/* All requests related to posts data will require autentication 
   token in the header */
posts_router.use(isAuth, auth_errorHandler);

/************************************** routes **************************************/

/* Get the posts feed (all posts) */
posts_router.get('/feed', getFeed);

/* Create a post, req.body: title, body, tags (array of tags) */
posts_router.post('/create-post', createPost);

/* Make a comment, req.body: comment, query: post id (pid) */
posts_router.post('/comment/:pid', writeComment);

/* Like a post, query: post id (pid) */
posts_router.post('/like/:pid', likePost);

/* Save a post, query: post id (pid) */
posts_router.post('/save-post/:pid', savePost);

/* Search for posts, query: query (what to search by) */
posts_router.get('/search/:query', search);

/* Get a post, query: post id (pid), for debugging purposes*/
posts_router.get('/get-post/:pid', getPost);
