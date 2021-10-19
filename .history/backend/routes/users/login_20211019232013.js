const auth = require("../../middlewares/authorize");
const multer = require("../../middlewares/multer-config");
const bcrypt = require("bcrypt");
const { User } = require("../../config/dbConfig");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          const message = `L'utilsateur demandé n'existe pas !`;
          res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe est incorrect !`;
              res.status(401).json({ message });
            }
            const token = jwt.sign(
                {
                  userId: user._id, // c'est le payload, et on encode le userId dans le token pour éviter qu'un user modifie des données d'un autre user
                },
                process.env.APP_SECRET,
                {
                  expiresIn: "24h",
                }
            const message = `L'utilsateur s'est connecté avec succès !`;
            res.status(200).json({ message, data: user });
          });
      })
      .catch((error) => {
        const message = `L'utilsateur n'a pas pu se connecter !`;
        res.status(500).json({ message, data: error });
      });
  });
};
