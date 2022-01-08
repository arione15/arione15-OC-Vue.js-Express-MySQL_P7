'use strict';

const express = require('express');
const router = express.Router();
const postControl = require("../controllers/postController");
const { checkUser } = require('../middlewares/authUser');
const { authPage } = require('../middlewares/authPage');

const multer = require("../middlewares/multer-config");
//const upload = multer();

// post CRUD
router.post("/", checkUser, multer, postControl.createPost);
router.get("/", postControl.getAllPosts);
router.get("/:id", postControl.getOnePost);
router.put("/:id", authPage(['ADMIN']), multer, postControl.updatePost);
router.delete("/:id", authPage(['ADMIN']), postControl.deletePost);

module.exports = router;