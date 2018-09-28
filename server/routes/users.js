const express = require("express");
const router = express.Router();
const { User } = require("../database/models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"]
    });
    res.json(users);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
