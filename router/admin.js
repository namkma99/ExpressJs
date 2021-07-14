const express = require('express')
const router = express.Router()
const { Admin, SigninAdmin } = require('../controller/Admin.Controller')
router.post('/admin', Admin);
router.get('/admin', SigninAdmin);
module.exports = router;