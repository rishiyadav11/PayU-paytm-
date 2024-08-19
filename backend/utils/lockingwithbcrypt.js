const bcrypt = require('bcryptjs');

const createpassword =async (password)=>{
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

module.exports = createpassword;