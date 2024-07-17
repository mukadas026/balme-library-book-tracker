import { Router } from "express";
import { getUsers, getUserSelf } from "../controllers/users.controller";

export const usersRouter = Router()

usersRouter.get("/", getUsers)
usersRouter.get("/self", getUserSelf)