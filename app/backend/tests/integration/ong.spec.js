const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')


describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterEach(async () => {
        await connection.destroy()
    })

    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "apad@gmail.com",
                whatsapp: "11988991261",
                city: "Rio do Sul",
                uf: "SC"
            })

            expect(response.body).toHaveProperty('id')
            expect(response.body.id).toHaveLength(8)
    })
})