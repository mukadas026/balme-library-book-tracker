import { Router } from "express";
import { addBookHandler, deleteBookHandler, editBookHandler, getbookHandler } from "../controllers/books.controller";
import { checkAccess } from "../middleware/checkAccess";

export const booksRouter = Router()


booksRouter.get("/", getbookHandler)

booksRouter.use(checkAccess)
booksRouter.post("/", addBookHandler)
booksRouter.put("/", editBookHandler)
booksRouter.delete("/", deleteBookHandler)