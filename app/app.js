import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRouter from './routers/auth.router.js'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware.js'

const app = express()


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api/v1/auth', authRouter)

app.use('/', (req, res) => {
    res.send({ message: "API is working!" });
});

app.use(errorHandlerMiddleware)

export default app