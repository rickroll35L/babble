const db = require('../database/db');

module.exports = {
    changePassword,
    changeEmail,
    deleteAccount
}

/* change user password, req.body: email, oldPassword, newPassword */
async function changePassword (req, res) {
    // TODO
    res.send('change password');
}

/* change user email, req.body: oldEmail, newEmail, password */
async function changeEmail (req, res) {
    // TODO
    res.send('change email');
}

/* delete account, req.body: email, password */
async function deleteAccount (req, res) {
    // TODO
    res.send('delete account');
}