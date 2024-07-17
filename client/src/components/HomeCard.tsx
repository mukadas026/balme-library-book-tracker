import { FC } from "react"
import { useNavigate } from "react-router-dom"

const HomeCard: FC<{ bgImg: string; text: "books" | "borrowed" | "users" }> = ({ bgImg, text }) => {
	const navigate = useNavigate()
	return (
		<div
			className='w-full md:w-1/3 max-w-[250px] h-60 relative flex items-center justify-center rounded-md overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-black hover:scale-105 cursor-pointer group'
			onClick={() => navigate(`/${text}`)}
		>
			<img
				src={bgImg}
				alt=''
				className='absolute rounded-md w-full h-full object-cover '
			/>
            <div className="absolute w-full h-full bg-black/50 transition-all duration-300 group-hover:bg-black/0"></div>
			<h4 className='relative z-10 text-4xl font-black text-white'>/ {text} /</h4>
		</div>
	)
}
export default HomeCard
