import { Icon } from "@iconify/react"
import { useSidebarContext } from "../context/SidebarContextProvider"
import TopbarMenu from "../components/TopbarMenu"
import { useState } from "react"

const Topbar = () => {
	const { collapse, setCollapse } = useSidebarContext()

	const [openTopMenu, setOpenTopMenu] = useState(false)

	return (
		<div className='relative w-full bg-white shadow-md h-14 text-other flex items-center transition-all duration-500 px-4 py-2'>
			<button
				className={`${collapse ? "block" : "hidden"} hover:text-blue-500 transition-all duration-300 hover:scale-y-110`}
				onClick={() => setCollapse(false)}
			>
				<Icon
					icon='charm:menu-hamburger'
					fontSize={40}
				/>
			</button>
			{/* <div className="w-96 h-96 bg-red-500"></div> */}
			<button 
      onClick={() => setOpenTopMenu(prev => !prev)}
      className='ml-auto bg-gray-400 rounded-full p-2 ring-2 ring-transparent hover:ring-blue-500/75 transition-all duration-300'>
				<Icon
					icon='fluent-emoji:person-dark'
					fontSize={30}
				/>
			</button>
			<TopbarMenu openTopMenu={openTopMenu} />
		</div>
	)
}
export default Topbar
