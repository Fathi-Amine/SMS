const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}


function issueJWT({payload}) {
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {  algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
    }
}

function verifyToken(token) {
    const tokenParts = token.split(' ');

    if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {

        return jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });
    }
}

/*function authMiddleware(req, res, next) {
    const tokenParts = req.headers.authorization.split(' ');

    if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {

        try {
            const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });
            req.jwt = verification;
            next();
        } catch(err) {
            res.status(401).json({ success: false, msg: "You are not authorized to visit this route" });
        }

    } else {
        res.status(401).json({ success: false, msg: "You are not authorized to visit this route" });
    }


}*/

const attachCookieToResponse = ({res, user,refreshToken})=>{
    const accessTokenJWT = issueJWT({payload:{user}})
    const refreshTokenJWT = issueJWT({payload: {user, refreshToken}})

    const oneDay = 1000*60*60*24
    const oneMonth = 1000*60*60*24*30
    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        maxAge:oneDay,
    })
    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + oneMonth),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    })
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.verifyToken = verifyToken;
/*module.exports.authMiddleware = authMiddleware;*/
module.exports.attachCookieToResponse = attachCookieToResponse;