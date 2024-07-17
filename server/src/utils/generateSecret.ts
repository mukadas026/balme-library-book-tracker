import { randomBytes } from "crypto";

export const generateSecret = () => {
    return randomBytes(35).toString("hex")
}