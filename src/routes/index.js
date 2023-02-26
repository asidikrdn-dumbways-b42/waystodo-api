const express = require("express");
const router = express.Router();
const user = require("./user");
const todo = require("./todo");

user(router);
todo(router);

module.exports = router;
