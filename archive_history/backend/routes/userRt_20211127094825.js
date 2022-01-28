const express = require('express');
const router = express.Router();
const { checkUser } = require('../middlewares/authUser');
const authRole = require('../middlewares/authPage');

// const authController = require("../controllers/auth.controller");
const userControl = require("../controllers/userController");
// const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// user auth
router.post("/signup", userControl.signUp);
router.post("/login", userControl.login);
router.get("/logout", checkUser, userControl.logout);

// user DB
router.get("/", checkUser, userControl.getAllUsers);
router.get("/:id", checkUser, userControl.getOneUser);
router.put("/:id", userControl.updateUser);
router.delete("/:id", authPage([ADMIN]), userControl.deleteUser);

// upload
//router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;