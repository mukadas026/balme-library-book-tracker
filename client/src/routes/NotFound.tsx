import { NavLink } from "react-router-dom"

const NotFound = () => {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<p className="text-7xl font-black text-other/85">NotFound</p>
            <NavLink to="/" className="text-blue-500 underline text-3xl">Go Home</NavLink>
		</div>
	)
}
export default NotFound
