import { errorHandler } from "../utils/error.js"

export const addTravelStory = async (req, res, next) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body

    const userId = req.user.id

    // validate required field

    if (!title, !story, !visitedLocation, !imageUrl, !visitedDate) {
        return res.status(errorHandler(401, "All fields are required"))
    }

    const parseVisitedDate = new Date(parseInt(visitedDate))

    try {
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parseVisitedDate
        })

        await travelStory.save()

        res.status(200).json({
            story: travelStory,
            message: "Story added successfully"
        })
    } catch (err) {
        console.log(err)
    }
}

export const getAllTravelStory = async (req, res, next) => {
    const userId = req.user.id

    try {
        const travelStories = await TravelStory.find({ userId: userId }).sort({
            isFavourite: -1,
        })

        res.status(200).json({ stories: travelStories })
    } catch (error) {
        console.log(error)
    }
}


export const imageUpload = async(req,res,next)=>{
    try{

        if(!req.file){
            return next(errorHandler(400,"No image upladed"))
        }

        const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`

        res.status(201).json({imageUrl})
        
    }catch(error){
        next(error)
    }
}