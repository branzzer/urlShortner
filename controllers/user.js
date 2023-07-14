const { v4: uuidv4 } = require('uuid')
const User = require('../models/user')
const { setUser } = require('../service/auth')
// post 
const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body

    await User.create({
        name,
        email,
        password

    })

    return res.redirect('/')


}

//post
const handleUserloginUp = async (req, res) => {
    const { email, password } = req.body

    let user = await User.findOne({ email, password });

    if (!user) {
        console.log(`canot get user =>${user}`)
        return res.render('login', {
            Error: "invalid email or password",
        })
    }
    // const sessionId = uuidv4(); it is used in statefull 
    //setUser(sessionId, user)    it is used in statefull 
    const token = setUser(user)
    res.cookie('token', token)
    return res.redirect('/')
    // return res.json({ token });

}


module.exports = {
    handleUserSignUp,
    handleUserloginUp

}