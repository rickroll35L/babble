// // // // // //
//* ROUTES    *//
// // // // // //
const initRoutes = (app, local) => {
    //* USERS___________
    /**
     * @swagger
     * components:
     *    schemas:
     *      User:
     *        type: object
     *        properties:
     *          id:
     *            type: string
     *            description: The user ID.
     *            example: "user1"
     *          posts:
     *            type: array
     *            items: 
     *                type: integer
     *          saved:
     *            type: array
     *            items: 
     *                type: integer
     *      Post:
     *        type: object
     *        properties:
     *          body:
     *            type: string
     *            description: The body of the post.
     *            example: "This is the body of the post."
     *          title:
     *            type: string
     *            description: The title of the post.
     *            example: "This is the title of the post."
     *          id:
     *            type: integer
     *            description: The ID of the post. ID's are generated in chronological order, so the first post ever posted will have ID 0, the second 1, and so on.
     *            example: 0
     *          likes:
     *            type: integer
     *            description: The number of likes the post received.
     *            example: 0
     *          comments:
     *            type: array
     *            items: 
     *                type: object
     *                properties:
     *                  body:
     *                    type: string
     *                    description: The body of the comment.
     *                    example: "This is the body of the comment."
     *                  id:
     *                    type: int
     *                    description: The ID of the comment. ID's are generated in chronological order, so the first comment on this post will have ID 0, the second 1, and so on.
     *                    example: 0
     *                  poster:
     *                    type: string
     *                    description: The chosen name of the user who posted this comment.
     *                    example: "user1"
     *                  time:
     *                    type: string
     *                    description: The time this comment was posted.
     *                    example: ""
     *          tags:
     *            type: array
     *            items: 
     *                type: string
     *          time:
     *                    type: string
     *                    description: The time this comment was posted.
     *                    example: ""
    */

    /**
     * @swagger
     * /users/{uid}:
     *  get:
     *    summary: Returns the user object specifed by uid.
     *    description: Returns the user object specifed by uid.
     *    parameters:
     *      - in: path
     *        name: uid
     *        required: true
     *        description: ID of the user to retrieve.
     *        schema:
     *          type: string 
     *    responses: 
     *      200:
     *        description: A user object.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
    */
    app.get("/users/:uid", (req, res) => {
        const uid = req.params.uid;
        if (!uid) {
            res.status(400);
            res.send("Error: Missing parameter 'uid'");
        }
        else if (!local.users[uid]) {
            res.status(404);
            res.send("Error: User not found");
        }
        else {
            res.json(local.users[uid]);
        }
    });

    //? login and user auth, req.body: email, password
    app.post("/users/login", (req, res) => {
        
    })

    //? add new user, req.body: email, password
    app.post("/users/signup", (req, res) => {
        const body = req.body;
        if (!body.id) {
            res.status(400);
            res.send("Error: incorrect parameters for add-user");
        }
        else if (local.users[body.id] !== undefined) {
            res.status(409);
            res.send("Error: uid taken");
        }
        else {
            //TODO: firebase auth
            local.users[body.id] = {
                id: body.id,
                posts: [],
                saved: [],
            }
            local.writeUsers();
            res.send("User was added");
        }
    });

    //? delete user account with id uid
    app.delete("/users/:uid/delete", (req, res) => {

    });


    //* POSTS___________
    //? get feed (all posts)
    app.get("/posts", (req, res) => {

    });

    /**
     * @swagger
     * /posts/{pid}:
     *  get:
     *    summary: Returns the post object specifed by pid.
     *    description: Returns the post object specifed by pid.
     *    parameters:
     *      - in: path
     *        name: pid
     *        required: true
     *        description: ID of the post to retrieve.
     *        schema:
     *          type: integer 
     *    responses: 
     *      200:
     *        description: A post object.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Post'
    */
    app.get("/posts/:pid", (req, res) => {
        const pid = parseInt(req.params.pid, 10);
        if (!req.params.pid) {
            res.status(400);
            res.send("Error: Missing parameter 'pid'");
        }
        else if (!local.posts[pid]) {
            console.log(local.posts[pid]);
            res.status(404);
            res.send("Error: Post not found");
        }
        else {
            res.json(local.posts[pid]);
        }
    });

    //? create new post (req.body: post object)
    app.post("/users/:uid/create-post", (req, res) => {
        const body = req.body;

    });

    //? delete post
    app.delete("/posts/:pid/delete", (req, res) => {

    });

    //? comment on post w/ id pid (req.body: comment object)
    app.post("users/:uid/comment/:pid", (req, res) => {
        const body = req.body;

    });

    //? like post w/ id pid
    app.post("/users/:uid/like/:pid", (req, res) => {
        const body = req.body;

    });

    //? save post w/ id pid
    app.post("/users/:uid/save/:pid", (req, res) => {
        const body = req.body;

    });

    //? search for posts that match query
    app.get("/posts/search/:query", (req, rest) => {

    })
}

module.exports = initRoutes;