'use strict';

const express = require('express');
const router = express.Router();
const { checkUser } = require('../middlewares/authUser');
const { authPage } = require('../middlewares/authPage');
const commentControl = require("../controllers/commentController");

// const authController = require("../controllers/auth.controller");
// const uploadController = require('../controllers/upload.controller');

// comment CRUD
router.post("/:postId/comment/", checkUser, commentControl.createComment);
router.get("/:postId/comment", checkUser, commentControl.getAllComments);
router.get("/:postId/comment/:commentId", checkUser, commentControl.getOneComment);
router.delete("/:postId/comment/:commentId", checkUser, commentControl.deleteComment);

module.exports = router;