import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignIn from "./routes/auth/SignIn"
import SignUp from "./routes/auth/SignUp"
import Layout from "./layout/Layout"
import Home from "./routes/Home"
import Books from "./routes/books/Books"
import Borrrowed from "./routes/Borrrowed"
import Users from "./routes/users/Users"
import Admins from "./routes/users/Admins"
import Others from "./routes/users/Others"
import ProtectedRoute from "./routes/ProtectedRoute"
import Add from "./routes/books/Add"
import Edit from "./routes/books/Edit"
import BorrowedBook from "./routes/books/Book"
import NotFound from "./routes/NotFound"

const Router = () => {
	const router = createBrowserRouter([
		{
			element: <ProtectedRoute />,
			errorElement: <NotFound />,
			children: [
				{
					element: <Layout />,
					children: [
						{
							path: "*",
							element: <NotFound />,
						},
						{
							path: "/",
							element: <Home />,
						},
						{
							path: "/books",
							element: <Books />,
						},
						{
							path: "/books/add",
							element: <Add />,
						},
						{
							path: "/books/edit/:bookID",
							element: <Edit />,
						},
						{
							path: "/books/:bookID",
							element: <BorrowedBook />,
						},
						{
							path: "/borrowed",
							element: <Borrrowed />,
						},
						{
							path: "/users",
							element: <Users />,
							children: [],
						},
						{
							path: "/users/admins",
							element: <Admins />,
						},
						{
							path: "/users/others",
							element: <Others />,
						},
					],
				},
			],
		},
		{
			path: "sign-in",
			element: <SignIn />,
		},
		{
			path: "sign-up",
			element: <SignUp />,
		},
	])
	return <RouterProvider router={router} />
}
export default Router
