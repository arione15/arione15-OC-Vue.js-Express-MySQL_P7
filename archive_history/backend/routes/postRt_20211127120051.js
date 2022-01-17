const express = require('express');
const router = express.Router();
const { checkUser } = require('../middlewares/authUser');
const { authPage } = require('../middlewares/authPage');

// const authController = require("../controllers/auth.controller");
const postControl = require("../controllers/postController");
// const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// post CRUD
router.get("/", checkUser, postControl.getAllPosts);
router.get("/:id", checkUser, userControl.getOnePost);
router.put("/:id", userControl.updateUser);
router.delete("/:id", authPage(['ADMIN']), userControl.deleteUser);

// upload
//router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;