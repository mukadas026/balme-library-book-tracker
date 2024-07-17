import { createContext, FC, ReactNode, useContext, useState } from "react"
// import { client } from "../utils/axios"
// import { useNavigate } from "react-router-dom"

interface IAuthContext {
	user: IUser | null
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const AuthContext = createContext<IAuthContext | null>(null)

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)
	
	// useEffect(() => {
	// 	;(async () => {
	// 		try {
	// 			const res = await client.get("/users/self")
	// 			console.log(res)
	// 			setUser(res.data.user)
				
	// 		} catch (err) {
	// 			console.log(err)
	// 		}
	// 	})()
	// }, [])

	const context: IAuthContext = {
		user,
		setUser,
	}
	return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
export default AuthContextProvider

export const useAuthContext = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("Use within auth")
    }
    return authContext
}