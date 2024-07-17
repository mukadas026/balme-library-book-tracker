import { Icon } from "@iconify/react"
import { useSidebarContext } from "../../context/SidebarContextProvider"
import SidebarContent from "./SidebarContent"
import { logo } from "../../assets"

const SidebarMobile = () => {
	const { collapse, setCollapse } = useSidebarContext()
	return (
		<div
			className={`absolute z-10 block md:hidden w-[400px] h-full text-pri bg-other ${
				collapse ? "-translate-x-[400px]" : "translate-x-0"
			} transition-all duration-500 py-16`}
		>
			<div className='flex justify-end px-2'>
				<button
					className='absolute top-6 right-6'
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
export default SidebarMobile
