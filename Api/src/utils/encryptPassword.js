const bycrypt = require('bcryptjs');

const encryptPassword = (password) => {

    const salt = bycrypt.genSaltSync(10);
    return bycrypt.hashSync(password, salt);

}

module.exports = encryptPassword;