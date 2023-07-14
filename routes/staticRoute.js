const express = require('express');
const URL = require('../models/url');
const { ristrictTo } = require('../middlewares/auth');

const route = express.Router();


route.get('/admin/url', ristrictTo(["ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({})
    console.log(allUrls)

    return res.render('home', {
        urls: allUrls
    })
})

route.get('/', ristrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id })
    console.log(allUrls)

    return res.render('home', {
        urls: allUrls
    })
})

route.get('/signup', async (req, res) => {
    return res.render('signup.ejs')
})

route.get('/login', async (req, res) => {
    return res.render('login')
})

module.exports = route