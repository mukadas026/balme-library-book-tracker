import { IconButton } from "@mui/material"
import { FC } from "react"
import { Icon } from "@iconify/react"
import { useAuthContext } from "../context/AuthContextProvider"
import { client } from "../utils/axios"
import { useNavigate } from "react-router-dom"
import { notify } from "../utils/notify"

const BorrowedBookCard: FC<{ book: IBook }> = ({ book }) => {
	const { user } = useAuthContext()

	const navigate = useNavigate()

	const handleBorrowDelete = async (userID: string) => {
		const id = notify("loading", "returning book ...")
		try {
			const res = await client.delete(`/borrow?userID=${userID}&bookID=${book._id}`)
			console.log(res)
			notify("success", "Book returned", { id })
		} catch (err) {
			console.log(err)
			notify("error", "Couldn't return book, try again", { id })
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
					{user?.accessLevel === 1 ? (
						<IconButton
							color='error'
							onClick={() => handleBorrowDelete(user!._id)}
							title='Return book'
						>
							<Icon
								icon='uil:exchange'
								fontSize={20}
							/>
						</IconButton>
					) : (
						<IconButton
							color='info'
							onClick={() => {
								navigate(`/books/${book._id}`, { state: { book } })
							}}
							title='View book'
						>
							<Icon
								icon='mdi:eye'
								fontSize={20}
							/>
						</IconButton>
					)}
				</div>
			</div>
		</div>
	)
}
export default BorrowedBookCard
