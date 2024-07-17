import { Toaster } from "react-hot-toast"
import AuthContextProvider from "./context/AuthContextProvider"
import Router from "./Router"

function App() {
	return (
		<AuthContextProvider>
			<Toaster />
			<Router />
		</AuthContextProvider>
	)
}

export default App
