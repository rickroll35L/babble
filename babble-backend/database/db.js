const fs = require('fs');

/* Load data from files to local database */
const loadData = () => {
    try {
        const userData = fs.readFileSync('./database/users.json', 'utf8');
        const postData = fs.readFileSync('./database/posts.json', 'utf8');
        const authData = fs.readFileSync('./database/auth.json', 'utf8');
        module.exports.users = JSON.parse(userData);
        module.exports.posts = JSON.parse(postData).posts;
        module.exports.auth = JSON.parse(authData);
        
    } catch (err) {
        // if data files do not yet exist, create them.
        writeUsers();
        writePosts();      
        writeAuth();
    }
}

/* Write to the database files ------------------------------------------------ */
const writeUsers = () => {
    const json = JSON.stringify(module.exports.users);
    fs.writeFile('./database/users.json', json, err => {
        if (err) {
            console.log(err)
        }
    })
};

const writePosts = () => {
    const json = JSON.stringify(module.exports.posts);
    fs.writeFile('./database/posts.json', json, err => {
        if (err) {
            console.log(err)
        }
    })
};

const writeAuth = () => {
    const json = JSON.stringify(module.exports.auth);
    fs.writeFile('./database/auth.json', json, err => {
        if (err) {
            console.log(err)
        }
    })
};
/* ---------------------------------------------------------------------------- */

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

auth = {
    /*
    hashed_id1: JWT1,
    hashed_id2: JWT2,
    .... and so on ....
    */
}

module.exports = {
    users,
    posts,
    auth, 
    loadData,
    writeUsers,
    writePosts,
    writeAuth
}