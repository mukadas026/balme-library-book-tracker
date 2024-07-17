import { useNavigate } from "react-router-dom"
import HomeCard from "../components/HomeCard"
// import { useAuthContext } from "../context/AuthContextProvider"
import { useEffect, useState } from "react"
import { client } from "../utils/axios"
import { Skeleton } from "@mui/material"

const Home = () => {
	const [books, setBooks] = useState<Array<IBook>>([])
	const [isLoading, setIsLoading] = useState(false)
	// const { user } = useAuthContext()
	const navigate = useNavigate()

	const getBooks = async () => {
		setIsLoading(true)
		try {
			const res = await client.get("/books")
			console.log(res)
			setBooks(res.data.books)
			setIsLoading(false)
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getBooks()
	}, [])

	return (
		<div className='w-[90%] lg:w-4/5 mx-auto'>
			<h2 className='text-4xl font-bold text-other py-8'>Where To?</h2>
			<div className='py-16 w-full  flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-y-0 md:gap-x-16'>
				<HomeCard
					bgImg='https://www.coupons.com.gh/blog/assets/images/read-multiple-books.jpg'
					text='books'
				/>
				<HomeCard
					bgImg='https://i0.wp.com/objectivefinancialpartners.com/wp-content/uploads/2020/07/bigstock-Man-Made-Word-Borrow-With-Wood-369101332.jpg?fit=1000%2C667&ssl=1'
					text='borrowed'
				/>
				<HomeCard
					bgImg='https://static.prod01.ue1.p.pcomm.net/blackbaud/user_content/photos/000/006/6783/a6132a5cd55abcae190bc82567ca8a47-original-users.png'
					text='users'
				/>
			</div>
			<div>
				<h2 className='text-4xl font-bold text-other py-8'>Checkout The Most Read Books</h2>
				<div className='w-full h-[1000px] py-16 flex flex-col md:grid grid-rows-3 grid-cols-3 gap-2 '>
					{isLoading ? (
						<>
							<div className='h-1/5 md:h-auto lg:col-span-1 lg:row-span-2  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'>
								<Skeleton
									variant='rounded'
									width='100%'
									height='100%'
									animation='wave'
								/>
							</div>
							<div className='h-1/5 md:h-auto lg:col-span-2 lg:row-span-1  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'>
								<Skeleton
									variant='rounded'
									width='100%'
									height='100%'
									animation='wave'
								/>
							</div>
							<div className='h-1/5 md:h-auto lg:col-span-1 lg:row-span-1  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'>
								<Skeleton
									variant='rounded'
									width='100%'
									height='100%'
									animation='wave'
								/>
							</div>
							<div className='h-1/5 md:h-auto lg:col-span-1 lg:row-span-2  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'>
								<Skeleton
									variant='rounded'
									width='100%'
									height='100%'
									animation='wave'
								/>
							</div>
							<div className='h-1/5 md:h-auto lg:col-span-2 lg:row-span-1  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'>
								<Skeleton
									variant='rounded'
									width='100%'
									height='100%'
									animation='wave'
								/>
							</div>
						</>
					) : (
						<>
							{" "}
							<div
								onClick={() => navigate(`/books/${books[0]?._id}`, { state: { book: books[0] } })}
								className='h-1/5 md:h-auto lg:col-span-1 lg:row-span-2  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'
							>
								<img
									src={books[0]?.img}
									alt=''
									className='absolute top-0 left-0 w-full h-full object-cover rounded-md'
								/>
								<p className='relative z-10 text-5xl font-black text-white transition-all duration-300 group-hover:text-gray-600 '>
									{books[0]?.title}
								</p>
							</div>
							<div
								onClick={() => navigate(`/books/${books[1]?._id}`, { state: { book: books[1] } })}
								className='h-1/5 md:h-auto lg:col-span-2 lg:row-span-1  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'
							>
								<img
									src={books[1]?.img}
									alt=''
									className='absolute top-0 left-0 w-full h-full object-cover rounded-md'
								/>
								<p className='relative z-10 text-5xl font-black text-white transition-all duration-300 group-hover:text-gray-600 '>
									{books[1]?.title}
								</p>
							</div>
							<div
								onClick={() => navigate(`/books/${books[2]?._id}`, { state: { book: books[2] } })}
								className='h-1/5 md:h-auto lg:col-span-1 lg:row-span-1  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'
							>
								<img
									src={books[2]?.img}
									alt=''
									className='absolute top-0 left-0 w-full h-full object-cover rounded-md'
								/>
								<p className='relative z-10 text-5xl font-black text-white transition-all duration-300 group-hover:text-gray-600 '>
									{books[2]?.title}
								</p>
							</div>
							<div
								onClick={() => navigate(`/books/${books[3]?._id}`, { state: { book: books[3] } })}
								className='h-1/5 md:h-auto lg:col-span-1 lg:row-span-2  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'
							>
								<img
									src={books[3]?.img}
									alt=''
									className='absolute top-0 left-0 w-full h-full object-cover rounded-md'
								/>
								<p className='relative z-10 text-5xl font-black text-white transition-all duration-300 group-hover:text-gray-600 '>
									{books[3]?.title}
								</p>
							</div>
							<div
								onClick={() => navigate(`/books/${books[4]?._id}`, { state: { book: books[4] } })}
								className='h-1/5 md:h-auto lg:col-span-2 lg:row-span-1  rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] relative flex items-center justify-center group'
							>
								<img
									src={books[4]?.img}
									alt=''
									className='absolute top-0 left-0 w-full h-full object-cover rounded-md'
								/>
								<p className='relative z-10 text-5xl font-black text-white transition-all duration-300 group-hover:text-gray-600 '>
									{books[4]?.title}
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
export default Home
