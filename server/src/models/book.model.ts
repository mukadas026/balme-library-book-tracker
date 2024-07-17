import mongoose from "mongoose"
import {v4 as uuidv4} from "uuid"

const bookSchema = new mongoose.Schema<BookSchema>({
	_id: String,
	title: String,
	description: String,
	category: Array<String>,
	count: Number,
	borrowed: Number,
	serialNumber: String,
	img: String
})

bookSchema.pre("save", function(){
	this._id = uuidv4()
})

const bookModel = mongoose.model("book", bookSchema)


export const addBook = async (book: BookSchema) => {
	await bookModel.create(book)
}

export const getBooks = async () => {
	return await bookModel.find({}).exec()
}

export const getBook = async (by: "_id" | "title" | "serialNumber", value: string) => {
	return await bookModel.findOne({ [by]: value }).exec()
}

// TODO:
// - don't understand
export const findBook = async (by: "_id" | "title" | "serialNumber", value: string) => {
	return await bookModel.find({}).$where(function () {
		// @ts-ignore
		return (this[by] as unknown as string).includes(value)
	})
}

export const editBook = async (book: BookSchema) => {
	await bookModel.updateOne({ _id: book._id }, { ...book }).exec()
}

export const deleteBook = async (_id: string) => {
	await bookModel.deleteOne({ _id }).exec()
}
