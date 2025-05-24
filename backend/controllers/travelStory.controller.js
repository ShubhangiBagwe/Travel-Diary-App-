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
            story:travelStory,
            message:"Story added successfully"
        })
    } catch (err) {
        console.log(err)
    }
}