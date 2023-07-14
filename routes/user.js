const express = require('express');
const { handleUserSignUp, handleUserloginUp } = require('../controllers/user');

const route = express.Router()

route.post('/', handleUserSignUp)
route.post('/login', handleUserloginUp)


module.exports = route