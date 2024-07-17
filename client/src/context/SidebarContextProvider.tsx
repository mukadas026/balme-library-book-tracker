import { createContext, FC, ReactNode, useContext, useState } from "react"

interface ISidebarContext {
	collapse: boolean
	setCollapse: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<ISidebarContext | null>(null)

const SidebarContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [collapse, setCollapse] = useState(true)
	const context = {
		collapse,
		setCollapse,
	}
	return <SidebarContext.Provider value={context}>{children}</SidebarContext.Provider>
}
export default SidebarContextProvider

export const useSidebarContext = () => {
    const sidebarContext = useContext(SidebarContext)
    if(sidebarContext){
        return sidebarContext
    }
    throw new Error("Use sidebar context within the sidebar wrapper")
}
