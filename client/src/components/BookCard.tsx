import { IconButton } from "@mui/material"
import { FC } from "react"
import { Icon } from "@iconify/react"
import { useAuthContext } from "../context/AuthContextProvider"
import { client } from "../utils/axios"
import { useNavigate } from "react-router-dom"
import { notify } from "../utils/notify"

const BookCard: FC<{ book: IBook, fetchBooks: () => Promise<void> }> = ({ book, fetchBooks }) => {
	const { user } = useAuthContext()

	const navigate = useNavigate()

	const handleDelete = async () => {
		if (user?.accessLevel === 1) return
		const id = notify("loading", "deleting book ...")
		try {
			const res = await client.delete(`/books?_id=${book._id}`)
			console.log(res)
			// navigate("/books")
			notify("success", "Book deleted", {id})
			await fetchBooks()
			} catch (err) {
				console.log(err)
				notify("error", "Couldn't delete book", {id})
		}
	}
	
	const handleBorrow = async () => {
		if (user?.accessLevel === 2) return
		const id = notify("loading", "borrowing ...")
		try {
			const userID = user?._id
			// const res = await client.post(`/borrow/by-user?userID=${userID}&bookID=${book._id}`)
			const res = await client.post(`/borrow/by-user`, { userID, bookID: book._id })
			console.log(res)
			navigate("/borrowed")
			notify("success", "Book borrowed", {id})
			} catch (err) {
				console.log(err)
				notify("error", "Couldn't borrow book, try again", {id})
		}
	}

	return (
		<div className='w-full flex justify-between h-20 shadow-sm items-center'>
			{/* <div>
				<div className='w-32 text-sm  line-clamp-1 text-clip text-center '>{book._id}</div>
			</div> */}
			<div>
				<div className='w-32 text-sm  line-clamp-1 text-clip text-center '>{book.title}</div>
			</div>
			<div className=''>
				<div className='w-32 text-sm  line-clamp-1 text-clip text-center '>{book.description}</div>
			</div>
			<div>
				<div className='w-32 text-sm  line-clamp-1 text-clip text-center '>{book.category}</div>
			</div>
			<div>
				<div className='w-32 text-sm  line-clamp-1 text-clip text-center '>{book.count}</div>
			</div>
			<div>
				<div className='w-32 text-sm  line-clamp-1 text-clip text-center '>{book.borrowed}</div>
			</div>
			{/* <div>
				<div className='w-32 text-sm  line-clamp-1 text-clip text-center '>{book.serialNumber}</div>
			</div> */}
			<div className=''>
				<div className='w-32 text-center '>
					<IconButton
						color='info'
						onClick={() => {
							navigate(`${book._id}`, { state: { book } })
						}}
						title="View book"
					>
						<Icon
							icon='mdi:eye'
							fontSize={20}
						/>
					</IconButton>
					{user?.accessLevel === 1 ? (
						<IconButton
							color='error'
							onClick={handleBorrow}
							title="Borrow book"
						>
							<Icon
								icon='uil:exchange'
								fontSize={20}
							/>
						</IconButton>
					) : (
						<>
							<IconButton
								className=''
								color='primary'
								onClick={() => navigate(`edit/${book._id}`, {state:{book}})}
								title="Edit book"
								>
								<Icon
									icon='fluent:edit-28-filled'
									fontSize={20}
									/>
							</IconButton>
							<IconButton
								color='error'
								onClick={handleDelete}
								title="Delete book"
							>
								<Icon
									icon='mdi:bin'
									fontSize={20}
								/>
							</IconButton>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
export default BookCard
