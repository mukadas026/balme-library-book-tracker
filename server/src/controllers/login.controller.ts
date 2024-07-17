import { Request, Response } from "express"
import { sendDefaultErrorResponse } from "../utils/utils"
import { findUser } from "../models/user.model"
import { setCookie } from "../utils/setCookie"
import { compare } from "bcrypt"

export const loginUser = async (req: Request<any, any, { email: string; password: string }>, res: Response) => {
	try {
		const { email, password } = req.body
		const user = await findUser("email", email)
		if (user === null) {
			res.status(404).json({ message: "user not found" })
		} else {
			console.log(password, user)
			const passwordMatch = await compare(password, user.password)

			if (!passwordMatch) {
				res.status(400).json({ message: "Wrong Password! Please try again." })
			} else {
				setCookie(req, res, user)
				res.status(200).json({
					user: {
						_id: user._id,
						name: user.name,
						email: user.email,
						accessLevel: user.accessLevel,
						position: user.position,
						image: user.image,
					},
					message: "login successful",
				})
			}
		}
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}
