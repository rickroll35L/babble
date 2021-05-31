const db = require('../database/db');

/* Helper function: check that endpoint properly passes PID */
function verifyPID(req, res, callback) {
    const pid = parseInt(req.params.pid, 10);
 
    if (!pid && pid != 0) {
        res.status(400).send("Error: Improperly formed request. Missing parameter pid.");
    }
    else if (!db.posts.feed[pid] || db.posts.feed[pid].isDeleted) {
        res.status(404).send("Error: Post not found.");
    }
    else {
        res.status(200);
        callback();
    }
}

module.exports = {
    verifyPID,
}