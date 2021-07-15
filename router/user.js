const express = require('express')
const router = express.Router()
const {auth} = require('./verifyToken')
const {UserSignin} = require('../controller/Users.Controller')
router.get('/user/login', UserSignin)

module.exports = router;