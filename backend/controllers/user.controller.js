import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const getUsers = async (req, res, next) => {
  console.log('requestInGetUser', req)
  const userId = req?.user?.id
  console.log('req.user', req.user)

  const validUser = await User.findOne({ _id: userId })

  if (!validUser) {
    return next(errorHandler(401, "Unauthorized"))
  }

  const { password: pass, ...rest } = validUser._doc

  res.status(200).json(rest)
}