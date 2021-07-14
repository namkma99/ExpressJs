const express = require('express')
const router = express.Router()
const {UserSignin} = require('../controller/Users.Controller')
router.get('/user', UserSignin)

module.exports = router;