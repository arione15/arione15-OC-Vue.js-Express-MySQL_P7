const jwt = require('jsonwebtoken');
constUserModel = require('../models/User');

module.exports = (req, res, next) => {
    const token = req.cookies.jwt; // récupérer le token dans le cookie
    jwt.verify(token, process.env.SECRET_KEY, async()); // décoder le token à l'aide du code secret ==> le résultat du décodage est un objet js classique
    const userId = decodedToken.userId; // extraction du userId du token décodé
    if (req.body.userId && req.body.userId !== userId) { // vérifier s'il y a un userId dans le coprs de la requête et si oui, vérifier s'il correspond bien au userId encodé dans le token
        const message = `L'identifiant de l'utilisateur est invalide.`
        res.status(401).json({ message })
    } else {
        next();
    }
}