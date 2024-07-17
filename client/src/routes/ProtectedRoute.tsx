import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../context/AuthContextProvider"
// import { useEffect } from "react"
// import { client } from "../utils/axios"

const ProtectedRoute = () => {
	const { user } = useAuthContext()

	// useEffect(() => {
	// 	;(async () => {
	// 		try {
	// 			const res = await client.get("/users/self")
	// 			console.log("res", res.data.user)
	// 			// setUser(res.data.user)
	// 			console.log("protected-after", user)
	// 		} catch (err) {
	// 			// setUser(null)
	// 			console.log(err)
	// 		}
	// 	})()
	// }, [])

	console.log("protected", user)
	if (user === null) {
		return <Navigate to='/sign-in' />
	}
	return <Outlet />
	// return <Navigate to="/" />
}
export default ProtectedRoute
