const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupérer le token (dans la console en-tête HTTP "Authorization: Bearer [Token]")
        const decodedToken = jwt.verify(token, process.env.APP_SECRET); // décoder le token à l'aide du code secret ==> le résultat du décodage est un objet js classique
        const userId = decodedToken.userId; // extraction du userId du token décodé
        if (req.body.userId && req.body.userId !== userId) { // vérifier s'il y a un userId dans le coprs de la requête et si oui, vérifier s'il correspond bien au userId encodé dans le token
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

/* ***************************

const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
  
  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }

    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next()
    }
  })
}

*********************************************/