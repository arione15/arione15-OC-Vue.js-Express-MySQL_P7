const { User } = require("../config/dbConfig");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.uploadProfil = async(req, res) => {
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error("invalid file");

        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        return res.status(201).json({ err });
    }
    const fileName = req.body.firstName + ".jpg"; // donner à tous les fichiers le prénom du user avec la même extension jpg et date.now() pour qu'elle soit unique
    await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../media/profil/${fileName}`)
    );

    //enregistrer l'url de la photo dans la BDD
    try {
        let id = req.body.userId;
        let userObject = req.file ? {...req.body,
            photoUrl: `${req.protocol}://${req.get("host")}/images/profil/${ fileName }`
        } : {...req.body };

        User.update(userObject, { where: { id } })
            .then(() => {
                res.status(200).json({ message: "L'image de votre profil a bien été modifiée" });
            });
    } catch (err) {
        const message = "Failed to add photo!";
        res.status(400).json({ message, data: err });
    }
};