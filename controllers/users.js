const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signup(req, res) {
  try {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ email, password: hashedPassword });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.sendStatus(401);
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.sendStatus(401);
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({ token });
  } catch (e) {
    res.sendStatus(400);
    console.log(e);
  }
}

function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
    console.log(e);
  }
}

function checkAuth(req, res) {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
    console.log(e);
  }
}

module.exports = { signup, login, logout, checkAuth };
