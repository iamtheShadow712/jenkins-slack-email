import dotenv from "dotenv"
import connectDB from "./config/db.config.js"
import app from './app/app.js'

dotenv.config({ path: '.env' })

const PORT = process.env.PORT || 8500


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on port: " + PORT)
    })
})
