import { Button, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
// import {v4 as uuidv4} from "uuid"
import { client } from "../../utils/axios"
import { useLocation, useNavigate } from "react-router-dom"
import { notify } from "../../utils/notify"
import { Oval } from "react-loader-spinner"

const defaultValues: IBook = {
	_id: "",
	title: "",
	description: "",
	category: "",
	count: 0,
	borrowed: 0,
	serialNumber: "",
	img: "",
}

const Edit = () => {
	const [book, setBook] = useState<IBook>(defaultValues)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const location = useLocation()
	const { book: oldBook } = location.state
	useEffect(() => {
		setBook(oldBook)
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		const id = notify("loading", "Updating book ...")
		try {
			// const serialNumber = uuidv4()
			const res = await client.put("/books", { book: { ...book } })
			console.log(res)
			if (res.status === 200) {
				navigate("/books")
			}
			setIsLoading(false)
			notify("success", "book updated", { id })
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			notify("error", "couldn't update book, try again", { id })
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { name, value } = e.target

		if (name === "count") {
			value = Number(value) as unknown as string
		}

		setBook((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<div className='w-[90%] mx-auto md:w-3/4 lg:w-2/4 py-16 space-y-16 shadow-md p-4 rounded-md shadow-black/50'>
			<h3 className='text-4xl md:text-6xl text-center text-other/75 font-bold'>Edit Book</h3>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-y-4'
			>
				<TextField
					name='title'
					label='Title'
					value={book.title}
					onChange={handleChange}
				/>
				<TextField
					name='description'
					label='Description'
					multiline
					rows={4}
					value={book.description}
					onChange={handleChange}
				/>
				<TextField
					name='category'
					label='Category'
					value={book.category}
					onChange={handleChange}
				/>
				<TextField
					name='count'
					label='Count'
					type='number'
					value={book.count}
					onChange={handleChange}
				/>
				<TextField
					name='img'
					label='Image'
					value={book.img}
					onChange={handleChange}
				/>
				{/* <Button type="submit" variant="contained" color="error">Edit</Button> */}
				<Button
					type='submit'
					variant='contained'
					color='error'
					disabled={isLoading}
					className='flex items-center relative'
				>
					{isLoading ? (
						<Oval
							width={20}
							height={20}
							wrapperClass='absolute left-[39%]'
						/>
					) : (
						""
					)}
					<span className=''>Edit</span>
				</Button>
			</form>
		</div>
	)
}
export default Edit
