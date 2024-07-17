import { Router } from "express";
import { registerUser } from "../../controllers/register.controller";

export const registerRouter = Router()

registerRouter.post("/", registerUser)

// create user