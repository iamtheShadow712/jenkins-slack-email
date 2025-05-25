import ErrorHandler from "../utils/errorHandler.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import asyncHandler from "../utils/asyncHandler.js"

class AuthController {

    register = asyncHandler(async (req, res, next) => {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            throw new ErrorHandler("All fields are required", 400)
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ErrorHandler("User already exists with this email", 409);
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        res.status(201).json({
            success: true,
            userId: newUser._id
        })
    })
}

const authController = new AuthController()

export default authController