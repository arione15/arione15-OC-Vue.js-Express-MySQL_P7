'use strict';

const express = require("express");
const router = express.Router();
const { checkUser } = require("../middlewares/authUser");
const { authPage } = require("../middlewares/authPage");
const userControl = require("../controllers/userController");
const uploadControl = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer();
const validateSignup = require("../middlewares/validateSignup");

// user auth
router.post("/signup", validateSignup.register, userControl.signup);
router.post("/login", userControl.login);
router.get("/logout", checkUser, userControl.logout);

// user CRUD
router.get("/", checkUser, userControl.getAllUsers);
router.get("/:id", checkUser, userControl.getOneUser);
router.put("/:id", checkUser, userControl.updateUser);
router.delete("/:id", checkUser, userControl.deleteUser);

// upload
router.post("/upload", upload.single("file"), uploadControl.uploadProfil);

module.exports = router;