'use strict';

const express = require("express");
const router = express.Router();
const { checkUser } = require("../middlewares/authUser");
const { authPage } = require("../middlewares/authPage");
const userControl = require("../controllers/userController");
const multer = require("../middlewares/multer-config");
//const upload = multer();
//const validateSignup = require("../middlewares/validateSignup");
const upload = require('../middlewares/multer-config');
//const { noExtendLeft } = require("sequelize/types/lib/operators");

// user auth
router.post("/signup", upload, userControl.signup);
router.post("/login", userControl.login);
router.get("/logout", checkUser, userControl.logout);

// user CRUD
router.get("/", checkUser, userControl.getAllUsers);
router.get("/:id", checkUser, userControl.getOneUser);
router.put("/:id", checkUser, upload, userControl.updateUser);
router.delete("/:id", checkUser, userControl.deleteUser);

// // upload
// router.post("/upload", upload.single("file"), uploadControl.uploadProfil);

//module.exports = router;, upload.single("file"), uploadControl.uploadProfil);

module.exports = router;