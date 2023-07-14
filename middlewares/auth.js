const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
    //req.user = null

    //const authorizationHeaderValue = req.headers["authorization"]
    const tokenCookie = req.cookies?.token

    if (!tokenCookie) {
        return next()
    }

    const user = getUser(tokenCookie);
    req.user = user
    next()
}

const ristrictTo = (roles = []) => {
    return (req, res, next) => {
        if (!roles) return res.redirect('/login');

        if (!roles.includes(req.user?.role)) return res.end('unAuthorized')

        next();
    }


}

// const restrictToLoggedInUserOnly = (req, res, next) => {
//     //  const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization']

//     if (!userUid) return res.redirect('/login')
//     const token = userUid.split('Bearer ')[1]
//     const user = getUser(token);

//     if (!user) return res.redirect('/login')

//     req.user = user;
//     next()
// }

// const checkAuth = (req, res, next) => {
//     //const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization']
//     const token = userUid.split("Bearer ")[1]
//     // const user = getUser(userUid);
//     const user = getUser(token);

//     req.user = user;
//     next()
// }

module.exports = {
    checkForAuthentication,
    ristrictTo
    // restrictToLoggedInUserOnly,
    // checkAuth,
}