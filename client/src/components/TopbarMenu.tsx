// import { Button } from "@mui/material"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContextProvider"
import { FC } from "react"
import { client } from "../utils/axios"

const TopbarMenu: FC<{openTopMenu: boolean}> = ({openTopMenu}) => {
	const { setUser } = useAuthContext()

	const handleLogout = async () => {
		try {
			const res = await client.get("/auth/logout")
			console.log(res)
			setUser(null)
		} catch (err) {
			console.log(err)
		}
	}
    
	return (
		<div className={`absolute right-4 top-full bg-other/70 ${openTopMenu ? "h-40 text-sm w-32" : "!text-[0] h-0 w-0"} shadow-md rounded-md text-center py-4 flex flex-col items-center justify-center gap-y-4`}>
			<Link to='' className="flex items-center justify-start gap-x-1 w-3/5 text-white hover:text-blue-500 transition-all duration-300">
				<Icon icon='iconamoon:profile-fill' fontSize={openTopMenu ? 20 : 0}/>
				<span>Profile</span>
			</Link>
			<Link to='' className="flex items-center justify-start gap-x-1 w-3/5 text-white hover:text-blue-500 transition-all duration-300">
				<Icon icon='mdi:gear' className="" fontSize={openTopMenu ? 20 : 0}/>
				<span>Settings</span>
			</Link>
			<button
				className='flex items-center justify-start gap-x-1 w-3/5 text-white hover:text-blue-500 transition-all duration-300'
				onClick={handleLogout}
			>
				<Icon icon='solar:logout-3-bold' fontSize={openTopMenu ? 20 : 0}/>
				{openTopMenu ? <span>Logout</span> : ""}
			</button>
		</div>
	)
}
export default TopbarMenu
