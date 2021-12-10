// const multer = require('multer');
// const path = require("path");

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpeg',
//     'image/png': 'png',
//     'image/gif': 'gif',
//     'video/mp4': 'mp4'
// };

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "../media/profil");
//     },
//     filename: (req, file, cb) => { // renommer les fichiers pour éviter les doublons et remplacer les espaces par des underscores
//         const name = file.originalname.split(" ").join("_");
//         let extension = MIME_TYPES[file.mimetype]; // Définir l'extension du fichier
//         name = name.replace("." + extension, "_"); // création du nom final
//         cb(null, name + Date.now() + "." + extension); // personnaliser le nouveau nom complet du fichier
//     }
// });

// module.exports = multer({ storage: storage }).single("image"); // indiquer qu'il s'agit juste de la gestion de fichier individuel d'image