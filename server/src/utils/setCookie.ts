import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { jwtSecret } from ".."

export const setCookie = (req: Request, res: Response, user: UserSchema) => {
	const maxAge = 30 * 60

	const u = {
		_id: user._id,
		name: user.name,
		email: user.email,
		accessLevel: user.accessLevel,
		position: user.position,
		image: user.image,
	}

	const token = jwt.sign({ user: u }, jwtSecret, {
		expiresIn: maxAge,
	})
	// console.log(token)
	res.cookie("jwt", token, {
		maxAge: maxAge * 1000,
		httpOnly: true,
		secure: true,
		sameSite: "none"
		// signed
	})
}
