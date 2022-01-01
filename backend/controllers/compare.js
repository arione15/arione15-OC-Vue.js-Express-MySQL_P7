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