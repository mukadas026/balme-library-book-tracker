import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { jwtSecret } from ".."
import { findAll } from "../models/user.model"
import { sendDefaultErrorResponse, sendForbiddenResponse } from "../utils/utils"

export const getUsers = async (req: Request<any, any, any, {access: string}>, res: Response) => {
	try {
		const cookies = req.cookies

		console.log(cookies, cookies["jwt"])

		// const user = jwt.verify(cookies["jwt"], jwtSecret, {})
        const user = req.body.jwt.user
		const q = req.query
		console.log(user, q)
        // @ts-ignore
        if(user.accessLevel == 1){
            // res.status(403).json({message: "Access level 2 required"})
			sendForbiddenResponse(res)
        }else{
            const users = await findAll("accessLevel", q.access)
            res.status(200).json({users})
        }
	} catch (err) {
		console.log(err)
	}
}

export const getUserSelf = async (req: Request<any, any, {jwt: {user: UserSchema}}>, res: Response) => {
	try {
		const {body} = req
		res.status(200).json({user: body.jwt.user})
	} catch (error) {
		sendDefaultErrorResponse(res)
	}
}
