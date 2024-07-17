import { Router } from "express";
import { loginRouter } from "./login.router";
import { registerRouter } from "./register.router";

export const authRouter = Router()


authRouter.use("/login", loginRouter)
authRouter.use("/register", registerRouter)

authRouter.get("/logout", (req, res) => {
    res.clearCookie("jwt")
    res.status(200).json({message: "User logged out"})
})