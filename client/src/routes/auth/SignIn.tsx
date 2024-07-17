import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { Icon } from "@iconify/react"
import { Link, useNavigate } from "react-router-dom"
import { client } from "../../utils/axios"
import { useAuthContext } from "../../context/AuthContextProvider"
import { notify } from "../../utils/notify"
import { Oval } from "react-loader-spinner"

const SignIn = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	const { setUser } = useAuthContext()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isLoading) return
		const id = notify("loading", "signing in...")
		setIsLoading(true)
		try {
			const res = await client.post<{ user: IUser; message: string }>("/auth/login", { email, password })
			console.log(res)
			setUser(res.data.user)
			navigate("/")
			notify("success", "User signed in!", { id })
			setIsLoading(false)
		} catch (err) {
			console.log(err)
			notify("error", "Something went wrong, please try again", { id })
			setIsLoading(false)
		}
	}

	return (
		<div className='w-[90%] md:w-full max-w-xl mx-auto mt-60 md:mt-48 space-y-8 bg-red-500/0 shadow-md shadow-black px-4 md:px-10 py-8 rounded-md'>
			<div className=''>
				<h2 className='text-4xl text-center'>Login</h2>
			</div>
			<form
				className='flex flex-col gap-y-8'
				onSubmit={handleSubmit}
			>
				<TextField
					label='Email'
					type='email'
					placeholder='john@doe.com'
					variant='outlined'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className=''
				/>
				<TextField
					label='Password'
					type={showPassword ? "text" : "password"}
					variant='outlined'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
					<span className="">Sign In</span>
				</Button>
				<div className='text-center'>
					<p className='text-sm'>
						Don't have an Account?{" "}
						<Link
							to='/sign-up'
							className='text-blue-500 underline decoration-transparent hover:decoration-blue-500 transition-all duration-300'
						>
							Register here
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}
export default SignIn
