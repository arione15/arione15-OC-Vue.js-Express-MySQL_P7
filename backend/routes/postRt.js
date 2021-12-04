'use strict';

const express = require('express');
const router = express.Router();
const postControl = require("../controllers/postController");

// const authController = require("../controllers/auth.controller");
// const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// post CRUD
//router.post("/", checkUser, postControl.createPost);
router.post("/", postControl.createPost);

//router.get("/", checkUser, postControl.getAllPosts);
router.get("/", postControl.getAllPosts);

//router.get("/:id", checkUser, postControl.getOnePost);
router.get("/:id", postControl.getOnePost);

//router.put("/:id", checkUser, postControl.updatePost);
router.put("/:id", postControl.updatePost);

//router.delete("/:id", authPage(['ADMIN']), postControl.deletePost);
router.delete("/:id", postControl.deletePost);

// upload
//router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;