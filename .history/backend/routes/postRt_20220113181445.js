'use strict';

const express = require('express');
const router = express.Router();
const postControl = require("../controllers/postController");
const { checkUser } = require('../middlewares/authUser');
const { authPage } = require('../middlewares/authPage');

const multer = require("../middlewares/multer-config");
//const upload = multer();

// post CRUD
router.post("/", checkUr, multer, postControl.createPost);
router.get("/", postControl.getAllPosts);
router.get("/:id", checkUser, postControl.getOnePost);
router.get("/posts/:id", checkUser, postControl.getUserPosts);
//router.put("/:id", multer, postControl.updatePost);
router.delete("/:id", checkUser, postControl.deletePost);

module.exports = router;