import { genSalt, hash } from "bcrypt"
import { randomUUID } from "crypto"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema<UserSchema>({
    _id: {
        type: String,
        // unique: true
    },
	name: String,
	email: {
		type: String,
        unique: true,
		required: true,
	},
	accessLevel: Number,
	image: String,
	password: {
		type: String,
		required: true,
	},
	position: String,
})

userSchema.pre("save", async function (next) {
	const salt = await genSalt()
	console.log(crypto)
	const hashedPassword = await hash(this.password, salt)

	const randID = randomUUID()

	this._id = randID

	this.password = hashedPassword
	next()
})

export const userModel = mongoose.model("user", userSchema)

export const createUser = async (user: UserSchema) => {
    return await userModel.create(user)
}


export const findUser = async (key: FindUserKey, value:string) => {
    return userModel.findOne({[key]:value}).exec()
}

export const findUserPublic = async (key: FindUserKey, value:string) => {
    return userModel.findOne({[key]:value}).select("-password").exec()
}

export const findAll = async (key: FindUserKey, value:string) => {
    return userModel.find({[key]:value}).select("-password").exec()
}