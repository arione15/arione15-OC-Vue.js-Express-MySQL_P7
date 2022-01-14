bcrypt.hash(req.body.password, 10)
    .then(hashPass => {
        const userObject = {
            ...req.body,
            password: hashPass,
            image_url: req.file ? req.file.location : `${req.protocol}://${req.get('host')}/images/public/anonyme_avatar.png`,

        };
        User.create(userObject)
            .then(createdUser => {
                res.status(201).send(createdUser);
            })
            .catch(error => {
                res.status(500).json({ error });
            })
    })
    .catch(error => res.status(500).json({ error }));
};

//

exports.signup = async(req, res) => {

    console.log("image", req.file);
    try {
        const user = await User.findOne({ attributes: ['email'], where: { email: email } });

        if (user) {
            fs.unlinkSync(req.file.path);
            return res.status(409).send({ error: 'This email already exists!' });
        } else {
            bcrypt
                .hash(password, 10)
                .then(hashPass => {
                    const userObject = {
                        firstName: firstName,
                        familyName: familyName,
                        email: email,
                        password: hashPass,
                        role: role,
                        photoUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
                    };
                    console.log("photo", userObject.photoUrl);
                    User.create(userObject)
                        .then(createdUser => {
                            res.status(201).send(createdUser);
                        })
                        .catch(error => {
                            res.status(500).json({ error });
                        })
                })
                .catch(error => res.status(500).json({ error }));
        };
        const newCookie = { token: newToken, userId: user.id };
        const cryptedToken = cryptojs.AES.encrypt(JSON.stringify(newCookie), process.env.COOKIE_KEY).toString();
        res.cookie('snToken', cryptedToken, { //res.cookie() function set the cookie name to value.
            httpOnly: true,
            maxAge: 86400000 // cookie pendant 24 heure (en millisecondes)
        });

        res.status(200).send({ message: 'The user is successfully connected!', data: user, cryptedToken: cryptedToken }); // retourner le token au client
    } catch (error) {
        return res.status(500).send({ error: 'An error has occured while trying to sign up!' });
    }
}


//