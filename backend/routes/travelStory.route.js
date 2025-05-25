import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
import { addTravelStory, getAllTravelStory } from "../controllers/travelStory.controller.js"

const router = express.Router()

router.post("/add",verifyToken,addTravelStory)

router.get("/get-all",verifyToken,getAllTravelStory)

router.post("/image-upload",imageUpload)

export default router