const ModelAdmin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResgister } = require("../validation/validation.account");

exports.Admin = async (req, res) => {
  const body = req.body;
  const { error } = validationResgister(req.body);
  if (error) return res.send(error.details[0].message);
  const authAdmin = await ModelAdmin.findOne({ email: req.body.email });
  if (authAdmin) {
    return res.status(400).send({ message: "Email already exits !" });
  }

  const _admin = new ModelAdmin({
    ...body,
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
  console.log(req.body.role);
  const valiAdmin = await ModelAdmi.findOne({ email: req.body.email });

  if (!valiAdmin) return res.status(400).send("Email is not found");

  const validPassword = await bcrypt.compare(body.password, authAdmin.password);

  if (!validPassword) return res.status(400).send("Password is not found");

  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.header("auth-token", token).send(req.body,token);
};
