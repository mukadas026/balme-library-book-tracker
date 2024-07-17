import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar/Sidebar"
import SidebarMobile from "./sidebar/SidebarMobile"
import SidebarContextProvider from "../context/SidebarContextProvider"
import Topbar from "./Topbar"

const Layout = () => {
	return (
		<div className='w-screen h-screen flex text-inter relative overflow-hidden'>
			<SidebarContextProvider>
				<Sidebar />
				<SidebarMobile />
				<div className='w-full md:w-full bg-blue-500/0'>
					<Topbar />
					<main className='p-4 overflow-auto w-full h-full'>
						<Outlet />
					</main>
				</div>
			</SidebarContextProvider>
		</div>
	)
}
export default Layout
