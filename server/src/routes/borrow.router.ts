import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import { createBorrowHandler, deleteBorrowHandler, getAllBorrowsHandler, getBorrowsByBookHandler, getBorrowsByUserHandler } from "../controllers/borrow.controller";
import { checkAccess } from "../middleware/checkAccess";

export const borrowRouter = Router()

// all level access
borrowRouter.post("/by-user", createBorrowHandler)
borrowRouter.get("/by-user", getBorrowsByUserHandler)
borrowRouter.delete("/", deleteBorrowHandler)
// level 2 access
// borrowRouter.use(verifyJWT)

borrowRouter.use(checkAccess)
borrowRouter.get("/", getAllBorrowsHandler)
borrowRouter.get("/users", getBorrowsByBookHandler)


