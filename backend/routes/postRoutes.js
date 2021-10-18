const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');

const auth = require('../middlewares/authorize');
const multer = require('../middlewares/multer-config');

//middleware pour créer et enregistrer un nouveau media
//router.post('/', postCtrl.createPost);

// // middleware pour récupérer un tableau de tous les medias
// router.get('/', postCtrl.getAllPost);

// // middleware pour récupérer une sauce précise
// router.get('/:id', postCtrl.getMedia);

// // middleware pour modifier une sauce précise
// router.put('/:id', postCtrl.modify);

// //middleware pour supprimer une sauce précise
// router.delete('/:id', postCtrl.supprimer);

// //middleware pour envoyer son avis
// router.post('/:id/like', postCtrl.likeDislike);

module.exports = router;