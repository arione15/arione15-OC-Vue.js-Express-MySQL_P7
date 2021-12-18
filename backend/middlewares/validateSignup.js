'use strict';

const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            familyName: Joi.string().required(),
            email: Joi.string().email().required(),
            //confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
            password: Joi.string().min(8).max(30).regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
            ).required(), // doit contenir 8 caractères minimum avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial
            role: Joi.string().valid('admin', 'moder', 'basic')
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            res.status(400).send(`Validation error: ${error.details.map(x => x.message + ',')}`);
        } else {
            req.body = value;
            next();
        }
    }
}