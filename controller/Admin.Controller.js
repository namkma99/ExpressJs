const ModelAdmin = require('../model/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.Admin = async (req, res) => {
    const body = req.body;
    const authAdmin = await ModelAdmin.findOne({email: req.body.email})
    if(authAdmin) {
        res.status(400).send({ error: "Data not formatted properly" });
    }
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const _admin = new ModelAdmin(
        body
    );
    const salt = await bcrypt.genSalt(10);
    _admin.password = await bcrypt.hash(_admin.password, salt);
    _admin.save((error, data) => {
        if(error){
            res.status(400).send({message: error});
        }
        if(data)  {
            res.status(201).send({data, accssesToken: token});
        }
    })
}

exports.SigninAdmin = async (req, res) => {
    const body = req.body;
    const authAdmin = await ModelAdmin.findOne({email: req.body.email})
    if(authAdmin) {
        const validPassword = await bcrypt.compare(body.password,authAdmin.password);
        if(validPassword) {

            res.status(200).send('SUCCESS LOGIN !')
        }else {
            res.status(400).send(' ERRORS')
        }
    } else {
        res.status(400).send(' ERRORS')
    }
}

