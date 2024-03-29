var { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
var msg = "I am number 3"
var hash = SHA256(msg).toString();

const bcrypt = require('bcryptjs');

var password = "123abc";
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log("bcrypt hash", hash);
    })
});

var hashedpassword = "$2a$10$bVwbQet7LhJF33GgETv1XOIIg2N92cgD1E4PmVhVHMwaX3hA/CXrq";
bcrypt.compare(password, hashedpassword, (err, result) => {
    console.log(result);
});


var data = {
    id: 4,
    is2: 2
}

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

/*Man in the middle, can change the data, but he doesnt know the 
    salt value
*/
token.data.id = 5;


token.hash = SHA256(JSON.stringify(data)).toString();
var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
if (resultHash === token.hash) {
    console.log("data was not changed");
} else {
    console.log("data was changed, do not trust it");
}

//JWT - JSON Web Tokens - help with validaton
var data = {
    id: 10,
    is2: 22
}

var secret = "123abc";

var token = jwt.sign(data, secret);
console.log(token);

var decoded = jwt.verify(token, secret);
console.log(decoded);