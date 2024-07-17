import { Request, Response } from "express"
import { sendDefaultErrorResponse, sendForbiddenResponse } from "../utils/utils"
import { addBook, deleteBook, editBook, getBook, getBooks } from "../models/book.model"

export const addBookHandler = async (req: Request<any, any, { book: BookSchema; user: UserSchema }>, res: Response) => {
	try {
		const { book } = req.body
		await addBook(book)
		res.status(201).json({ message: "Book added!!!" })
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}

export const getbookHandler = async (req: Request<any, any, any, { _id: string }>, res: Response) => {
	try {
		const q = req.query
		if (q._id) {
			const book = await getBook("_id", q._id)
			if (book) {
				res.status(200).json({ book })
			} else {
				res.status(404).json({ message: "Book not Found" })
			}
		} else {
			const books = await getBooks()
			res.status(200).json({ books })
		}
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}

export const editBookHandler = async (
	req: Request<any, any, { book: BookSchema; user: UserSchema }>,
	res: Response
) => {
	try {
		const { book } = req.body

		await editBook(book)
		res.status(200).json({ message: "Update successful" })
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}

export const deleteBookHandler = async (req: Request<any, any, any, { _id: string }>, res: Response) => {
	try {
		const q = req.query

		await deleteBook(q._id)
		res.status(200).json({message: "Book deleted!!!"})
	} catch (err) {
		console.log(err)
		sendDefaultErrorResponse(res)
	}
}
