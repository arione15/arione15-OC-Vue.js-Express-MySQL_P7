const multer = require('multer');
const path = require("path");

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpeg',
//     'image/png': 'png',
//     'image/gif': 'gif',
//     'video/mp4': 'mp4'
// };

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "images"); },
    filename: (req, file, cb) => { // renommer les fichiers pour éviter les doublons et remplacer les espaces par des underscores
        let name = file.originalname.split(" ").join("_");
        //let extension = MIME_TYPES[file.mimetype]; // Définir l'extension du fichier
        //name = name.replace("." + extension, "_"); // création du nom final
        cb(null, name + Date.now() + path.extname(file.originalname)); // personnaliser le nouveau nom complet du fichier
    }
});

const MAX_SIZE = 1 * 1024 * 1024; // for 1MB

// Validation
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        //allowed extension
        const filetypes = /jprg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            //cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg and .gif format allowed!'));
        }
    },
    limits: { fileSize: MAX_SIZE },
}).single('image');

//module.exports = multer({ storage: storage }).single("image"); // indiquer qu'il s'agit juste de la gestion de fichier individuel d'image
module.exports = upload; // indiquer qu'il s'agit juste de la gestion de fichier individuel d'image