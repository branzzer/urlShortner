//const sessionIdToUserMap = new Map();  // used for statefull authentication
const jwt = require('jsonwebtoken');    //  used for stateless auntentication
const secret = "vinsin$4$"


const setUser = (user) => {
    // sessionIdToUserMap.set(id, user)     // used for statefull authentication
    return jwt.sign({
        _id: user._id,
        emial: user.email,
        role: user.role
    }, secret)
}

const getUser = (token) => {
    // return sessionIdToUserMap.get(id);  // used for statefull authentication
    if (!token) return null;
    return jwt.verify(token, secret)
}


module.exports = {
    setUser,
    getUser
}