const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

const mockCreate = {
    name: 'APAD',
    email: 'test@apad.com.br',
    whatsapp: '1234567890',
    city: 'Rio de Janeiro',
    uf: 'RJ',
}

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('Should be able to login', async () => {
        const resCreate = await request(app).post('/ongs').send(mockCreate)
        expect(resCreate.body).toHaveProperty('id')

        const { id } = resCreate.body

        const res = await request(app).post('/sessions').send({
            id,
        })

        expect(res.body).toHaveProperty('name')
    })

    it('Should be able to create a new ONG', async () => {
        const res = await request(app).post('/ongs').send(mockCreate)

        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toHaveLength(8)
    })
})
