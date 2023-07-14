const express = require('express')
const { handleGenerateNewURL, handleGetAnalytics, handleGetRedirected } = require('../controllers/url')



const router = express.Router()


router.post('/', handleGenerateNewURL)
router.get('/analytics/:shortId', handleGetAnalytics)
router.get('/:shortId', handleGetRedirected)




module.exports = router;