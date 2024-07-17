import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema<BorrowBook>({
    bookID: String,
    userID: String,
})

const borrowModel = mongoose.model("borrow", borrowSchema)

export const createBorrow = async (userID: string, bookID: string) => {
    await borrowModel.create({userID, bookID})
}
export const getAllBorrows = async () => {
    return await borrowModel.find({}).exec()
}
export const getBorrowsByUser = async (userID: string) => {
    return await borrowModel.find({userID}).exec()
}

export const getBorrowsByBook = async (bookID: string) => {
    return await borrowModel.find({bookID}).exec()
}

export const getBorrow = async (userID: string, bookID: string) => {
    return await borrowModel.findOne({userID, bookID})
}

export const deleteBorrow = async (userID: string, bookID: string) => {
    await borrowModel.deleteOne({userID, bookID})
}