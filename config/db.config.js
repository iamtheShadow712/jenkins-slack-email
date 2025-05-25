import mongoose from 'mongoose'

export default async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("Database connection successful")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}