// packages import
const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')

// file imports 
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const staticRoute = require('./routes/staticRoute')
const { checkForAuthentication, ristrictTo } = require('./middlewares/auth')
const { connectMongoDB } = require('./config');


const app = express();
const PORT = 8000


connectMongoDB('mongodb://localhost:27017/short_url')
    .then(() => console.log("connnected to mongoDB"))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser())
app.use(checkForAuthentication)

app.use('/url', ristrictTo(["NORMAL"]), urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)





app.listen(PORT, () => {
    console.log("server is running at port ", PORT)
})