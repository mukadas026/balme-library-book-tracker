import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useAuthContext } from "../../context/AuthContextProvider"
import { client } from "../../utils/axios"

const SidebarContent = () => {
	const { user, setUser } = useAuthContext()

	const handleLogout = async () => {
		try {
			const res = await client.get("/auth/logout")
			console.log(res)
			setUser(null)

			// window.navigation.reload()
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			<div className='text-center py-4'>
				<h3 className='w-fit mx-auto text-3xl font-black bg-gradient-to-r from-pri via-sec to-ter bg-clip-text text-transparent'>
					Welcome, {user?.name.slice(0, 7)}
				</h3>
			</div>
			<div className='flex flex-col items-center gap-y-8 py-14'>
				<Link
					to='/'
					className='flex items-center justify-center gap-x-4 font-black bg-size-200 bg-gradient-to-r from-white via-white to-sec hover:bg-right transition-all duration-500 w-4/5 text-center py-3 rounded-md shadow-md text-other '
				>
					<Icon icon='tabler:home-filled' className="text-3xl"/>
					<span>Home</span>
				</Link>
				<Link
					to='/books'
					className='flex items-center justify-center gap-x-4 font-black bg-size-200 bg-gradient-to-r from-white via-white to-sec hover:bg-right transition-all duration-500 w-4/5 text-center py-3 rounded-md shadow-md text-other '
				>
					<Icon icon='raphael:books' className="text-3xl"/>
					<span>Books</span>
				</Link>
				<Link
					to='/borrowed'
					className='flex items-center justify-center gap-x-4 font-black bg-size-200 bg-gradient-to-r from-white via-white to-sec hover:bg-right transition-all duration-500 w-4/5 text-center py-3 rounded-md shadow-md text-other '
				>
					<Icon icon='uil:exchange' className="text-3xl"/>
					<span>Borrowed</span>
				</Link>
				<Link
					to='/users'
					className='flex items-center justify-center gap-x-4 font-black bg-size-200 bg-gradient-to-r from-white via-white to-sec hover:bg-right transition-all duration-500 w-4/5 text-center py-3 rounded-md shadow-md text-other '
				>
					<Icon icon='mdi:users-group' className="text-3xl"/>
					<span>Users</span>
				</Link>
			</div>
			<div className='py-4 flex items-center justify-center'>
				<Button
					className='flex items-center gap-x-2'
					color='error'
					onClick={handleLogout}
				>
					<Icon
						icon='solar:logout-3-bold'
						fontSize={30}
					/>
					<span>Logout</span>
				</Button>
			</div>
		</>
	)
}
export default SidebarContent
