import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'

import { dbConnection } from './dbConnection.js'
import { errorHandler } from './errorHandler.js'

import router from './routes.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI || "";

app.get("/api", (req, res)=>{
    res.send("Hello")
})

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(bodyParser.json());

app.use("/api", router);

dbConnection(DB_URI);

app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
})