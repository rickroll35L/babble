require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const crypto = require('crypto')
const { writeFileSync } = require('fs');

module.exports = {
    createAccessToken
}

/*  create new secret for generating the JWTtokens */
generateSecret();

/* For testing purposes
/* //For testing if the authentication token in request is valid 
async function checkVerification(auth_in_database, auth_token) {
    const token = await createAccessToken();
    let payload = undefined;
    try {
        payload = await verify(token, '${process.env.ACCESS_TOKEN_SECRET}');
        if (payload !== undefined) {
            console.log(token);
        }
        else {
            throw new Error ('Verification failed');
        }
    }
    catch (err) {
        console.log(err);
    }
    
}
*/


function getRandomString() {
    const max = Number.MAX_SAFE_INTEGER;
    return (Math.floor(Math.random() * max)).toString();
}

/*  create new secret for generating the JWTtokens */
async function generateSecret() {
    const secret = await crypto.createHash('sha256').update(getRandomString()).digest('base64');
    const env = 'ACCESS_TOKEN_SECRET=' + secret;

    writeFileSync('./.env', env, err => {
        if (err) {
            console.log(err)
        }
    })
}

/* Make the JWT for login authentication */
async function createAccessToken() {
    const date = Date.now;
    return await sign({ date }, '${process.env.ACCESS_TOKEN_SECRET}');
}