'use strict';

const express = require('express');
const router = express.Router();
const postControl = require("../controllers/postController");
const { checkUser } = require('../middlewares/authUser');
const { authPage } = require('../middlewares/authPage');

// const authController = require("../controllers/auth.controller");
// const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// post CRUD
router.post("/", checkUser, postControl.createPost);
router.get("/", checkUser, postControl.getAllPosts);
router.get("/:id", checkUser, postControl.getOnePost);
router.put("/:id", checkUser, postControl.updatePost);
router.delete("/:id", authPage(['ADMIN']), postControl.deletePost);

// upload
//router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;