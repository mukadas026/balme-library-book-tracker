import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { jwtSecret } from ".."
export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const cookies = req.cookies
		// console.log(cookies, cookies["jwt"])
		const token = jwt.verify(cookies["jwt"], jwtSecret, {})
		// @ts-ignore
		req.body.jwt  = { user: token.user } as {user: UserSchema}
		next()
	} catch (err) {
		console.log(err)
		res.status(440).json({ message: "session expired" })
		console.log(err)
	}
}
