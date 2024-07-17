import { useEffect, useState } from "react"
import { NavLink, useLocation, useParams } from "react-router-dom"
import { Icon } from "@iconify/react"

import { client } from "../../utils/axios"
import UserCard from "../../components/UserCard"
import UserCardSkeleton from "../../components/UserCardSkeleton"
import { IconButton } from "@mui/material"
import { useAuthContext } from "../../context/AuthContextProvider"

const BorrowedBook = () => {
	const [users, setUsers] = useState<Array<IUser>>([])
	const [isLoading, setIsLoading] = useState(true)
	const params = useParams<{ userID: string }>()
	console.log(params)
	const location = useLocation()
	const state = location.state as { book: IBook }
	const book = state.book

	const { user } = useAuthContext()
	// const navigate = useNavigate()

	useEffect(() => {
		console.log("fetching users")
		setIsLoading(true)
		;(async () => {
			try {
				const res = await client.get(`/borrow/users?bookID=${book._id}`)
				console.log(res)
				setUsers(res.data.users)
				setIsLoading(false)
			} catch (err) {
				console.log(err)
				setIsLoading(false)
				// navigate(-1)
			}
		})()
	}, [])

	const handleBorrowDelete = async (userID: string) => {
		try {
			const res = await client.delete(`/borrow?userID=${userID}&bookID=${book._id}`)
			console.log(res)
		} catch (err) {
			console.log(err)
		}
	}

	if (!book) {
		return (
			<div className='w-full h-full flex flex-col items-center justify-center'>
				<p className='text-7xl font-black text-other/85'>NotFound</p>
				<NavLink
					to='/'
					className='text-blue-500 underline text-3xl'
				>
					Go Home
				</NavLink>
			</div>
		)
	}
	return (
		<div className='w-full space-y-20 py-32'>
			<div className='w-full lg:w-4/5 mx-auto flex flex-col items-center gap-y-8 md:flex-row md:gap-y-0 md:gap-x-8'>
				<div className='w-4/5 min-h-60 max-h-[400px] md:w-3/5'>
					<img
						className='w-full h-full max-h-[400px] md:aspect-[6/4] rounded-md  object-cover'
						src={book.img}
						alt=''
					/>
				</div>
				<div className='w-4/5 space-y-1 md:w-3/5'>
					<h3 className='text-3xl md:text-5xl font-bold'>{book.title}</h3>
					<p className='text-gray-500'>{book.category}</p>
					<div className='flex gap-x-4'>
						<p className='text-gray-500'>Copies: {book.count}</p>
						<p className='text-gray-500'>Borrowed: {book.borrowed}</p>
					</div>
					<p className='text-justify'>{book.description}</p>
				</div>
			</div>
			{user?.accessLevel === 1 ? null : (
				<div className='w-4/5 md:w-3/5 lg:w-2/5 mx-auto'>
					<h2 className='text-3xl font-bold text-center'>Currently Borrowed</h2>
					<div className='space-y-4'>
						{isLoading ? (
							[0, 0, 0].map(() => <UserCardSkeleton />)
						) : users.length === 0 ? (
							<div className='py-40 flex flex-col items-center relative'>
								{/* <Icon icon='ph:empty-bold' className="" fontSize={100}/> */}
								<Icon
									icon='ph:empty-bold'
									className='absolute top-0 text-other/5 text-[350px] md:text-[400px]'
								/>
								<p className='text-4xl md:text-7xl text-other/50  font-black text-center'>
									Tis empty, Sire
								</p>
							</div>
						) : (
							users.map((user) => (
								<div className='flex items-center gap-x-8'>
									<UserCard user={user} />
									<IconButton
										onClick={() => handleBorrowDelete(user._id)}
										color='error'
									>
										<Icon
											icon='mdi:bin'
											fontSize={20}
										/>
									</IconButton>
								</div>
							))
						)}
					</div>
				</div>
			)}
		</div>
	)
}
export default BorrowedBook
