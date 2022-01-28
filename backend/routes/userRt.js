'use strict';

const express = require("express");
const router = express.Router();
const { checkUser } = require("../middlewares/authUser");
const { authPage } = require("../middlewares/authPage");
const userControl = require("../controllers/userController");
const multer = require("../middlewares/multer-config");
//const upload = multer();
const validateSignup = require("../middlewares/validateSignup");
const upload = require('../middlewares/multer-config');

// user auth
//router.post("/signup", validateSignup, upload, userControl.signup);
router.post("/signup", upload, validateSignup.register, userControl.signup);
router.post("/login", userControl.login);
router.get("/logout", userControl.logout);

// user CRUD
router.get("/", userControl.getAllUsers);
router.get("/:id", userControl.getOneUser);
router.put("/:id", checkUser, upload, userControl.updateUser);
router.put("/:id/pwd", checkUser, userControl.updatePwd);
// router.delete("/:id", checkUser, authPage(1), userControl.deleteUser);
router.delete("/:id", checkUser, userControl.deleteUser);

module.exports = router;