const express = require("express");
const router = express.Router();
const { Admin, SigninAdmin, auth, getAllAdmin, getAdminById } = require("../controller/Admin.Controller");
router.post("/admin", Admin);
router.post("/admin/login", SigninAdmin);
router.get("/admin/login", auth, (req, res) => {
    res.json({
        posts: {
            title: 'nguyen duc nam',
        }
    })
});
router.get("/admin/:_id", getAdminById);
router.put("/admin/:_id/edit", getAdminById);
router.get("/admin/getAll", getAllAdmin);
module.exports = router;
