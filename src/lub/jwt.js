const util = require('util');
const jwt = require('jsonwebtoken');

// Reverse callback based function to promise based function
function sign(payload, secretPrivateKey, options = {}) {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secretPrivateKey, options, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    });

    return promise;
};

// Reverse callback based function to promise based function with core module util
const verify = util.promisify(jwt.verify);

module.exports = {
    sign,
    verify,
};