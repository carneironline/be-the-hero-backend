const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    ongs: {
        create: celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required().min(10).max(11),
                city: Joi.string().required(),
                uf: Joi.string().required().length(2),
            }),
        }),
    },

    profile: {
        read: celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required(),
            }).unknown(),
        }),
    },

    incidents: {
        read: celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
            }),
        }),

        create: celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required(),
            }).unknown(),
        }),

        delete: celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required(),
            }).unknown(),
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required(),
            }),
        }),
    },
}
