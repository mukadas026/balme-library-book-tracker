import { Button, InputAdornment, TextField } from "@mui/material"
import { Icon } from "@iconify/react"
import BookCard from "../../components/BookCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { client } from "../../utils/axios"
import BookCardSkeleton from "../../components/BookCardSkeleton"
import { useAuthContext } from "../../context/AuthContextProvider"

const Books = () => {
	const [books, setBooks] = useState<Array<IBook>>([])
	const [isLoading, setIsLoading] = useState(false)

	const {user} = useAuthContext()

	const navigate = useNavigate()

	const fetchBooks = async () => {
		setIsLoading(true)
		try {
			const res = await client.get("/books")
			if (res.status === 200) {
				setBooks(res.data?.books)
			}
			setIsLoading(false)
		} catch (err) {
			// console.log("/books", err)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchBooks()
	}, [])

	return (
		<div>
			<div className='h-14 flex items-center gap-x-4'>
				<TextField
					size='small'
					label=''
					placeholder='Search'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Icon icon='line-md:search' />
							</InputAdornment>
						),
					}}
				/>
				<Button variant='contained'>Find</Button>
				<Button
					variant='contained'
					onClick={() => navigate("add")}
					disabled={user?.accessLevel === 1}
					// disabled={user?.accessLevel === 1}
				>
					Add
				</Button>
				<Button
					variant='contained'
					onClick={() => navigate("/borrowed")}
				>
					Borrowed
				</Button>
			</div>
			<div className='py-8 w-[90%] mx-auto overflow-auto bg-red-500/0'>
				<div className='min-w-[750px] w-fit mx-auto bg-white shadow-md p-4 space-y-4 rounded-md'>
					<div className='w-full flex justify-between font-bold'>
						{/* <div className='w-32 text-center'>ID Tag</div> */}
						<div className='w-32 text-center'>Title</div>
						<div className='w-32 text-center'>Description</div>
						<div className='w-32 text-center'>Category</div>
						<div className='w-32 text-center'>Count</div>
						<div className='w-32 text-center'>Borrowed</div>
						{/* <div className='w-32 text-center'>Serial Number</div> */}
						<div className='w-32 text-center'></div>
					</div>
					{isLoading ? (
						[0, 0, 0].map((_) => <BookCardSkeleton />)
					) : books.length === 0 ? (
						<div className='py-40 flex flex-col items-center relative'>
							<Icon
								icon='ph:empty-bold'
								className='absolute top-0 text-other/5 text-[350px] md:text-[400px]'
							/>
							<p className='text-4xl md:text-7xl text-other/50  font-black text-center'>
								Tis empty, Sire
							</p>
						</div>
					) : (
						books.map((book) => (
							<BookCard
								book={book}
								fetchBooks={fetchBooks}
							/>
						))
					)}
				</div>
			</div>
		</div>
	)
}
export default Books
