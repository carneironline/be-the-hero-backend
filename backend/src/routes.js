const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const validators = require('./validators')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)

routes.post('/ongs', validators.ongs.create, OngController.create)

routes.get('/profile', validators.profile.read, ProfileController.index)

routes.get('/incidents', validators.incidents.read, IncidentController.index)

routes.post(
    '/incidents',
    validators.incidents.create,
    IncidentController.create
)

routes.delete(
    '/incidents/:id',
    validators.incidents.delete,
    IncidentController.delete
)

module.exports = routes
