const connection = require('../database/connection')

const table = 'incidents'

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query
        const perPage = 5
        const offset = (page - 1) * perPage

        const [count] = await connection(table).count()

        const incidents = await connection(table)
            .join('ongs', 'ongs.id', '=', `${table}.ong_id`)
            .limit(perPage)
            .offset(offset)
            .select([`${table}.*`, 'ongs.name', 'ongs.city', 'ongs.uf'])

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response) {
        const { title, description, value } = request.body
        const ongId = request.headers.authorization

        const [id] = await connection(table).insert({
            title,
            description,
            value,
            ong_id: ongId,
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        const ongId = request.headers.authorization

        const incident = await connection(table)
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id !== ongId) {
            response.status(401).json({ error: 'Operation not permitted' })
        }

        await connection(table).where('id', id).delete()

        return response.status(204).send()
    },
}
