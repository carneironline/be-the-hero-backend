const connection = require('../database/connection')

const table = 'incidents'

module.exports = {
    async index(request, response) {
        const ongId = request.headers.authorization
        const incidents = await connection(table)
            .where('ong_id', ongId)
            .select('*')

        return response.json(incidents)
    },
}
