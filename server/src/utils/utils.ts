import { Response } from "express";

export const sendDefaultErrorResponse = (res: Response) => {
    res.status(500).json({message: "something went wrong"})
}
export const sendForbiddenResponse = (res: Response) => {
    res.status(403).json({message: "Access Level 2 required"})
}

export const sendNotFoundResponse = (res: Response) => {
    res.status(404).json({message: "Not Found!!!"})
}

export const sendBadRequestResponse = (res: Response) => {
    res.status(400).json({message: "Please provide both a userID and  bookID"})
}