const jwt = require('jsonwebtoken');


const getToken = (payload) => {

    return jwt.sign({
        data: payload
    }, process.env.JWT_SECRET_WORD, { expiresIn : '10h'})

}

const getTokenData = (token) => {

    let data = null;
    
    try {
        data = jwt.verify(token, process.env.JWT_SECRET_WORD);
    } catch (err) {
        console.log(err);
    }

    return data;

}

module.exports = {
    getToken,
    getTokenData
}



