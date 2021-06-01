const argon2 = require('argon2');
const crypto = require('crypto');
const local = require('../database/db');

module.exports = {
    encryptEmail,
    encryptPassword,
    userWithEmail,
    passwordMatchesUser,
    isUCLAemail
}

async function encryptEmail(email) {
    return await crypto.createHash('sha256').update(email).digest('base64');
}

async function userWithEmail(email) {
    local.loadData();
    
    const hash_email = await encryptEmail(email); 
    return local.users[hash_email];
}

async function encryptPassword(password) {
    return await argon2.hash(password, 32);
}

/* Assumes that the 'user' passed is a valid user in the database */
async function passwordMatchesUser(user, password) {
    return await argon2.verify(user.password, password);
}

function isUCLAemail(email) {
    const ucla_email_1 = /^[a-z0-9]+@ucla\.edu$/;
    const ucla_email_2 = /^[a-z0-9]+@g\.ucla\.edu$/;
    return ((ucla_email_1.test(email)) || (ucla_email_2.test(email)));
}