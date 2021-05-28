const fs = require('fs');

const loadData = () => {
    try {
        const userData = fs.readFileSync("./data/users.json", "utf8");
        const postData = fs.readFileSync("./data/posts.json", 'utf8');
        module.exports.users = JSON.parse(userData);
        module.exports.posts = JSON.parse(postData).posts;
        
    } catch (err) {
        // if data files do not yet exist, create them.
        writeUsers();
        writePosts();      
    }
}

const writeUsers = () => {
    const json = JSON.stringify(module.exports.users);
    fs.writeFile('./data/users.json', json, err => {
        if (err) {
            console.log(err)
        }
    })
}

const writePosts = () => {
    const json = JSON.stringify(module.exports.posts);
    fs.writeFile('./data/posts.json', json, err => {
        if (err) {
            console.log(err)
        }
    })
}

users = {
    /*
    {
    hashed_id_of_user1: {
        password: "***", // hashed password
        posts: [ //array of post ids created by user1
            0, // id is same as index in posts array
            1,
            2,
        ],
        saved: [ //array of post ids saved by user1
            0,
            1,
        ],
    }
}   
    */
}

//NOTE: for quick access, only store reference to post id (since id = index in array, access is O(1))
posts = [
    /*
    {
        id: 0, // id is equal to index in feed (quick access)
        time: "time posted",
        title: "Title",
        body: "body",
        likes: 0,
        tags: [
            "tag1",
            "tag2",
        ],
        comments: [
            {
                id: 0,
                time: "time posted",
                poster: "name",
                body: "body",
            }
        ]
    },
    */
]

module.exports = {
    users,
    posts,
    loadData,
    writeUsers,
    writePosts,
}