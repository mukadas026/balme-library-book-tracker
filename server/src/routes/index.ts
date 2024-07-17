import { Router } from "express";
import { authRouter } from "./auth/auth.router";
import { usersRouter } from "./users.router";
import { verifyJWT } from "../middleware/verifyJWT";
import { booksRouter } from "./books.router";
import { borrowRouter } from "./borrow.router";

export const router = Router()

router.use("/auth", authRouter)


router.use(verifyJWT)

router.use("/users", usersRouter)

router.use("/books", booksRouter)

router.use("/borrow", borrowRouter)
