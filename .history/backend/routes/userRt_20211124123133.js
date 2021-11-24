const express = require('express');
const router = express.Router();
// const authController = require("../controllers/auth.controller");
const userController = require("../controllers/userController");
// const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// user auth
router.post("/signup", userController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// upload
//router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;