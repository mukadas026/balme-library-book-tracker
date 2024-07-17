import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { Icon } from "@iconify/react"
import { Link, useNavigate } from "react-router-dom"
import { client } from "../../utils/axios"
import { useAuthContext } from "../../context/AuthContextProvider"
import { Oval } from "react-loader-spinner"
import { notify } from "../../utils/notify"

const defaultInfo: IUser = {
	_id: "",
	email: "",
	image: "",
	name: "",
	position: "",
	password: "",
	accessLevel: 1,
}

const SignUp = () => {

	const [userInfo, setUserInfo] = useState(defaultInfo)
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)


	const navigate = useNavigate()

	const {setUser} = useAuthContext()

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isLoading) return
		const id = notify("loading", "creating account...")
		setIsLoading(true)
		try {
			userInfo.accessLevel = Number(userInfo.accessLevel) as 1 | 2
			// const _id = crypto.randomUUID() as string
			const res = await client.post<{user:IUser, message:string}>("/auth/register", {...userInfo})
			if(res.status === 201){
				// set auth context
				console.log(res)
				setUser(res.data.user)
				notify("success", "User created!", { id })
				setIsLoading(false)
				navigate("/")
			}
		} catch (err) {
			console.log(err)
			notify("error", "Something went wrong!", { id })
			setIsLoading(false)
		}
	}

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let { name, value } = e.target
		if (name === "accessLevel") {
			if (Number(value) >= 2) {
				value = "2"
			} else {
				value = "1"
			}
		}
		setUserInfo((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<div className='w-[90%] md:w-full max-w-xl mx-auto pt-10 md:pt-32 space-y-8'>
			<div className=''>
				<h2 className='text-4xl text-center'>Create an Account</h2>
			</div>
			<form
				className='flex flex-col gap-y-8'
				onSubmit={submitHandler}
			>
				<div className='flex  flex-col md:flex-row gap-y-8 md:gap-x-2 justify-between'>
					<TextField
						label='Email'
						type='email'
						name='email'
						placeholder='john@doe.com'
						variant='outlined'
						value={userInfo.email}
						onChange={onChangeHandler}
						className='flex-1'
					/>
					<TextField
						label='Name'
						type='text'
						name='name'
						placeholder='John Doe'
						variant='outlined'
						value={userInfo.name}
						onChange={onChangeHandler}
						className='flex-1'
					/>
				</div>
				<div className='flex  flex-col md:flex-row gap-y-8 md:gap-x-2 justify-between'>
					<TextField
						label='Position'
						type='text'
						name='position'
						placeholder='CEO'
						variant='outlined'
						value={userInfo.position}
						onChange={onChangeHandler}
						className='flex-1'
					/>
					<TextField
						label='Access Level'
						type='text'
						name='accessLevel'
						placeholder='1'
						variant='outlined'
						value={userInfo.accessLevel}
						onChange={onChangeHandler}
						className='flex-1'
					/>
				</div>
				<TextField
					label='Image URL'
					type='text'
					name='image'
					placeholder='image.jpeg'
					variant='outlined'
					value={userInfo.image}
					onChange={onChangeHandler}
					className=''
					/>
				<TextField
					label='Password'
					type={showPassword ? "text" : "password"}
					variant='outlined'
					name='password'
					value={userInfo.password}
					onChange={onChangeHandler}
					className=''
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={() => setShowPassword((prev) => !prev)}>
									{showPassword ? <Icon icon='mdi:eye-off' /> : <Icon icon='mdi:eye' />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					type='submit'
					variant='contained'
					color='error'
					disabled={isLoading}
					className="flex items-center relative"
				>
					{isLoading ? (
						<Oval
							width={20}
							height={20}
							wrapperClass="absolute left-[39%]"
						/>
					) : (
						""
					)}
					<span className="">Sign Up</span>
				</Button>
				<div className='text-center'>
					<p className='text-sm'>
						Already have an Account?{" "}
						<Link
							to='/sign-in'
							className='text-blue-500 underline decoration-transparent hover:decoration-blue-500 transition-all duration-300'
						>
							Login here
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}
export default SignUp
