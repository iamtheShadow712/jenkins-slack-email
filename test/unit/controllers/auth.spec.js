import httpMocks from 'node-mocks-http'
import authController from '../../../app/controllers/auth.controller.js'
import User from '../../../app/models/user.model.js'
import ErrorHandler from '../../../app/utils/errorHandler.js'
import bcrypt from 'bcryptjs'


describe('AuthController.register', () => {
    let req, res, next

    beforeEach(() => {
        req = { body: {} }
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
        next = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should throw error if fields missing', async () => {
        req.body = { username: '', email: '', password: '' }
        await authController.register(req, res, next)
        expect(next).toHaveBeenCalled()
        const error = next.mock.calls[0][0]
        expect(error).toBeInstanceOf(ErrorHandler)
        expect(error.statusCode).toBe(400)
    })
})