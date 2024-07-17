import { Request, Response } from "express"
import { sendBadRequestResponse, sendDefaultErrorResponse, sendNotFoundResponse } from "../utils/utils"
import {
	createBorrow,
	deleteBorrow,
	getAllBorrows,
	getBorrow,
	getBorrowsByBook,
	getBorrowsByUser,
} from "../models/borrow.model"
import { editBook, getBook } from "../models/book.model"
import { findUser } from "../models/user.model"

export const createBorrowHandler = async (
	req: Request<any, any, { userID: string; bookID: string }>,
	res: Response
) => {
	try {
		const { body } = req
		console.log("body, borrow", body)
		if (!body.userID || !body.bookID) {
			sendBadRequestResponse(res)
		} else {
			const borrowed = await getBorrow(body.userID, body.bookID)
			if (borrowed) {
				res.status(403).json({ message: "Book already borrowed!" })
			} else {
				await createBorrow(body.userID, body.bookID)
				res.status(201).json({ message: "Book borrowed successfully!" })
				const book = await getBook("_id", body.bookID)
				
				if (book) {
					const updatedBook = { ...book.toObject(), count: book?.count - 1, borrowed: book?.borrowed + 1 }
					await editBook(updatedBook)
				}
			}
		}
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}

export const getBorrowsByUserHandler = async (req: Request<any, any, any, { userID?: string }>, res: Response) => {
	try {
		const { query } = req
		if (query.userID) {
			const userBorrow = await getBorrowsByUser(query.userID)
			const borrows = await Promise.all(userBorrow.map((borrow) => getBook("_id", borrow.bookID)))
			res.status(200).json({ books: borrows })
		} else {
			sendNotFoundResponse(res)
		}
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}

export const getBorrowsByBookHandler = async (req: Request<any, any, any, { bookID?: string }>, res: Response) => {
	try {
		const { query } = req
		if (query.bookID) {
			// C O N T I N U E		F R O M		H E R E
			const usersBorrowed = await getBorrowsByBook(query.bookID)
			const borrows = await Promise.all(usersBorrowed.map((borrow) => findUser("_id", borrow.userID)))
			res.status(200).json({ users: borrows, message: "This is it" })
		} else {
			sendNotFoundResponse(res)
		}
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}

export const getAllBorrowsHandler = async (req: Request, res: Response) => {
	try {
		const userBorrow = await getAllBorrows()
		const borrows = await Promise.all(userBorrow.map((borrow) => getBook("_id", borrow.bookID)))
		res.status(200).json({ books: borrows })
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}

export const deleteBorrowHandler = async (
	req: Request<any, any, any, { userID: string; bookID: string }>,
	res: Response
) => {
	try {
		const query = req.query
		if (query.userID && query.bookID) {
			await deleteBorrow(query.userID, query.bookID)
			res.status(200).json({ message: "Book return" })
			const book = await getBook("_id", query.bookID)
				
				if (book) {
					const updatedBook = { ...book.toObject(), count: book?.count + 1, borrowed: book?.borrowed - 1 }
					await editBook(updatedBook)
				}
		} else {
			sendBadRequestResponse(res)
		}
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}
