import { Icon } from "@iconify/react"
import { logo } from "../../assets"
import SidebarContent from "./SidebarContent"
import { useSidebarContext } from "../../context/SidebarContextProvider"

const Sidebar = () => {
	const { collapse, setCollapse } = useSidebarContext()
	return (
		<div
			className={`hidden md:block ${
				collapse ? "-translate-x-[400px] w-0" : "translate-x-0 w-[400px]"
			}  transition-all duration-500 bg-other text-pri py-4`}
		>
			<div className='flex justify-end px-2'>
				<button
					className='text-white hover:text-red-500 transition-all duration-300 hover:scale-110'
					onClick={() => setCollapse(true)}
				>
					<Icon
						icon='ic:round-close'
						fontSize={40}
					/>
				</button>
			</div>
			<div className='flex items-center justify-center'>
				<img
					src={logo}
					alt=''
					className='w-20 aspect-auto'
				/>
			</div>
			<SidebarContent />
		</div>
	)
}
export default Sidebar
