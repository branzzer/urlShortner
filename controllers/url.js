const shortid = require('shortid')
const URL = require('../models/url')

//post
const handleGenerateNewURL = async (req, res) => {
    const body = req.body
    if (!body.url) return res.status(400).json({
        error: 'url is required'
    })
    const shortID = shortid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    return res.render('home', {
        id: shortID,
    })
    //res.status(201).json({ id: shortID });

}

//get
const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId });
    console.log(result);
    return res.json({
        //msg: "pedning"
        totalClicks: result.visitHistory.length,
        analyics: result.visitHistory
    })


}

const handleGetRedirected = async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: { visitHistory: { timestamp: Date.now() } } })

    res.redirect(entry.redirectURL)
}


module.exports = {
    handleGenerateNewURL,
    handleGetAnalytics,
    handleGetRedirected
}