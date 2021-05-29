const argon2 = require('argon2');
const crypto = require('crypto');
const local = require('../database/db');

module.exports = {
    encryptEmail,
    encryptPassword,
    userWithEmail,
    passwordMatchesUser
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