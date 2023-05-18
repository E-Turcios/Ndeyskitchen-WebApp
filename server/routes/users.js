const express = require("express");
const User = require("../database/models/userModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({mss: "This is the json"});
});

router.post("/", async (req, res) => {
  const {firstName, lastName, email, password, phoneNumber} = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

module.exports = router;
