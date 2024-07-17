/// <reference path="./types/types.d.ts" />
/// <reference path="./types/schema.d.ts" />

import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors, { CorsOptions } from "cors"
import bodyParser from "body-parser"
import { generateSecret } from "./utils/generateSecret"

import { router } from "./routes"

export const jwtSecret = generateSecret()

const MONGO_URL = "mongodb+srv://mukadasm026:dlXveiyZCFAhku2D@cluster0.o1u4rqc.mongodb.net/balme-library-asset-tracker?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(MONGO_URL)
.catch(err => console.log(err))
mongoose.connection.on("error", e => console.log(e))

const app = express()

app.use(cookieParser())
const corsOptions : CorsOptions = {
    origin: ["http://localhost:3000"],
    // origin: "*",
    credentials: true, 
}
app.use(cors(corsOptions))
app.use(bodyParser.json({limit: "1gb"}))

app.use("/api/", router)


app.listen(7000, () => {
    console.log("listening on port ")
})