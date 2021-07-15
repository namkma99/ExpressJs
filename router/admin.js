const express = require("express");
const router = express.Router();
const { Admin, SigninAdmin, auth } = require("../controller/Admin.Controller");
router.post("/admin", Admin);
router.post("/admin/login", SigninAdmin);
router.get("/admin/login", auth, (req, res) => {
    res.json({
        posts: {
            title: 'nguyen duc nam',
        }
    })
});
module.exports = router;
