const ModelAdmin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validationResgister,
  validationLogin,
} = require("../validation/validation.account");
const { response } = require("express");

exports.Admin = async (req, res) => {
  const { error } = validationResgister(req.body);
  if (error) return res.send(error.details[0].message);
  const authAdmin = await ModelAdmin.findOne({ email: req.body.email });
  if (authAdmin) {
    return res.status(400).send({ message: "Email already exits !" });
  }

  const _admin = new ModelAdmin({
    ...req.body,
    role: "admin",
  });
  const salt = await bcrypt.genSalt(10);
  _admin.password = await bcrypt.hash(_admin.password, salt);
  try {
    const _saveAdmin = await _admin.save();
    res.status(200).send(_saveAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.SigninAdmin = async (req, res) => {
  const { error } = validationLogin(req.body);
  if (error) return res.send(error.details[0].message);

  const valiAdmin = await ModelAdmin.findOne({ email: req.body.email });
  const { email, password, role } = valiAdmin;

  if (!valiAdmin) return res.status(400).send("Email is not found");

  const validPassword = await bcrypt.compare(
    req.body.password,
    valiAdmin.password
  );

  if (!validPassword) return res.status(400).send("Password is not found");

  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.header("auth-token", token).send({
    data: {
      email,
      password,
      role,
    },
    Token: token,
  });
};

exports.auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Accesss Denied");
  try {
    const user = new ModelAdmin();
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};
