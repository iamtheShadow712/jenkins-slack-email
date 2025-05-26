import request from 'supertest'
import app from '../../app/app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../../app/models/user.model.js'

dotenv.config({ path: '.env.test' })


describe("User should be able to register", () => {

    beforeEach(async () => {
        await mongoose.connect(process.env.MONGO_TEST_URL)
    })

    afterEach(async () => {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteMany({});
        }
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })


    it("Should be able to register", async () => {
        const userData = {
            username: "username 2",
            email: "user2@user.com",
            password: "user2password"
        }

        const res = await request(app).post('/api/v1/auth/register').send(userData)

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
    })

    it("Should not be able to register", async () => {
        const userData = {
            username: "username 1",
            email: "user1@user.com"
        }

        const res = await request(app).post('/api/v1/auth/register').send(userData)
        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.message).toBe("All fields are required")
    })

    it("Is existing User, not able to register again", async () => {
        const userData = {
            username: "username1",
            email: "user1@user.com",
            password: "user1password"
        }
        await User.create(userData)

        const res = await request(app).post('/api/v1/auth/register').send(userData)

        expect(res.statusCode).toBe(409)
        expect(res.body.success).toBe(false)
        expect(res.body.message).toBe("User already exists with this email")
    })
})