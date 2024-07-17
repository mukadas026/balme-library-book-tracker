import { NextFunction, Request, Response } from "express"
import { sendDefaultErrorResponse, sendForbiddenResponse } from "../utils/utils"
export const checkAccess = async (
	req: Request<any, any, { jwt: { user: UserSchema } }>,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			jwt: { user },
		} = req.body
		if (user.accessLevel === 1) {
			sendForbiddenResponse(res)
		} else {
			next()
		}
	} catch (err) {
		sendDefaultErrorResponse(res)
	}
}
