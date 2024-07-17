import { Request, Response } from "express"
import { sendDefaultErrorResponse } from "../utils/utils"
import { createUser, findUser } from "../models/user.model"
import { setCookie } from "../utils/setCookie"

export const registerUser = async (req: Request<any, any, UserSchema>, res: Response) => {
	try {
		const user = req.body
		console.log(user)
		// console.log(req.cookies)
		const userExists = await findUser("email", user.email)
		if (userExists === null) {
			// upload user image to db

			// add user to db
			const newUser = await createUser(user)
			setCookie(req, res, newUser)
			// setTimeout(() => {
			res.status(201).json({
				user: {
					_id: user._id,
					name: user.name,
					email: user.email,
					accessLevel: user.accessLevel,
					position: user.position,
					image: user.image,
				},
				message: "user created",
			})
			// }, 2000)
		} else {
			res.status(400).json({ message: "user exists" })
		}
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}
