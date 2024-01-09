import express from 'express'
import mongoose from 'mongoose'
import seed from './seeding/seeder'
import cors from 'cors';
import bodyParser from 'body-parser';

require('dotenv').config()

const app = express()

app.use(cors());

// SEED
seed()

app.use(bodyParser.json());

// ROUTES

app.use('/api/insurance', require('./routes/insurance'))

// MONGOOSE SETUP

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }).catch((error) => {
        console.log(error)
    })

