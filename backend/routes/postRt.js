'use strict';

const express = require('express');
const router = express.Router();
const postControl = require("../controllers/postController");
const { checkUser } = require('../middlewares/authUser');
const { authPage } = require('../middlewares/authPage');

const multer = require("multer");
const upload = multer();

// post CRUD
router.post("/", checkUser, upload.single("file"), postControl.createPost);
router.get("/", checkUser, postControl.getAllPosts);
router.get("/:id", checkUser, postControl.getOnePost);
router.put("/:id", checkUser, postControl.updatePost);
router.delete("/:id", authPage(['ADMIN']), postControl.deletePost);

module.exports = router;