import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.route.js"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import travelStoryRoutes from "./routes/travelStory.route.js"
import path from "path"
import { fileURLToPath } from "url"
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err)
})

const app = express()

//enablke cors for frontend

app.use(cors({
    origin: "http://localhost:5173",   //use frontend url
    methods: ["GET","POST","PUT","DELETE"],  //allowed crud operations
    credentials: true    // allow cookies and authorization error
}))
app.use(cookieParser())

app.use(express.json())

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
})

app.use("/api/auth", authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/travel-story", travelStoryRoutes)

// server static file from uplads and assets directory
const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})