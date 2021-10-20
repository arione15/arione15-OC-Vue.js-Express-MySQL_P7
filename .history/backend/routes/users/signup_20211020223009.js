const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");
//const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const Joi = require("joi"); //  valider le mot de passe côté client

/*  *********************************************************** */
//  I. Contrôleur pour l'enregistrement d'un nouvel utilisateur
/*  *********************************************************** */
// 1- valider les input de l'email et du mdp, 2- crypter le mdp, 3- créer nouvel user, 4- l'enregistrer dans la BDD
// module.exports = (app) => {
//   app.post("/api/signup", (req, res) => {
//   const schema = Joi.object().keys({
//     email: Joi.string().min(7).required().email(),
//     password: Joi.string().min(8).required().max(30).regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//       ), // doit contenir 8 caractères minimum avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial
//   });
//   const result = schema.validate(req.body); // pour valider les entrées par rapport au schema de JOI
//   if (result.error) {
//     res.status(400).send(result.error);
//   } else {
//     bcrypt
//       .hash(req.body.password, 10) // c'est une Promise dont la résolution est le hash généré
//       .then((hash) => {
//         const user = new User({
//           name: req.body.name, 
//           firstname: req.body.firstname, 
//           email: req.body.email, 
//           password: hash,
//           imageUrl: req.body.imageUrl
//         });
//         user
//           .save()
//           .then(() =>
//             res.status(201).json({
//               message: "Utilisateur créé !",
//             })
//           )
//           .catch((error) =>
//             res.status(400).json({
//               error,
//             })
//           );
//       })
//       .catch((error) => {
//         const message = `L'utilsateur n'a pas pu se connecter !`;
//         res.status(500).json({ message, data: error });
//       });
//   }
// });
// }
module.exports = (app) => {
  app.post("/api/signup", async (req, res) => {
    const { name, firstname, email, password, imageUrl } = req.body;

const alreadyExistsUser = await User.findOne({ where: { email } }).catch(err => {console.log("Erreur :", err);});
if(alreadyExistsUser) {
  return res.json({ message: "Cet email est pris, choisiisez-en un autre !" });
}
bcrypt.hash(req.body.password, 10).then(hashed => {
const newUser = new User(
  {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: hashed,
    imageUrl: req.body.imageUrl
  }
  );

const savedUser = await newUser.save().then(_ =>
            res.status(201).json({ message: "Utilisateur créé !" })).catch(err => {
  console.log("Erreur :", err);
  res.json({ error: "Impossible d'enregistrer cet utilisateur pour le moment !" });
});
  });
});
}