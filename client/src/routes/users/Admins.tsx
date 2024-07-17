import { useEffect, useState } from "react"
import { isAxiosError } from "axios"
import { Icon } from "@iconify/react"
import { client } from "../../utils/axios"
import { useAuthContext } from "../../context/AuthContextProvider"
import UserCard from "../../components/UserCard"
import UserCardSkeleton from "../../components/UserCardSkeleton"

const Admins = () => {
	const [users, setUsers] = useState<Array<IUser> | null>([])
	const [isLoading, setIsloading] = useState(false)

	const { setUser } = useAuthContext()

	useEffect(() => {
		setIsloading(true)
		;(async () => {
			try {
				const res = await client.get<{ users: Array<IUser> }>("/users?access=2")
				// @ts-ignore
				console.log(res)
				setUsers(res.data.users)
				setIsloading(false)
			} catch (err) {
				setIsloading(false)
				if (isAxiosError<any, { message: string }>(err)) {
					console.log(err.response)
					if (err.response?.status === 440) {
						setUser(null)
					} else if (err.response?.status === 403) {
						setUsers(null)
					}
				}
				console.log(err)
			}
		})()
	}, [])

	return (
		<div className='py-16'>
			<div className=''>
				<h2 className='text-4xl text-other font-black text-center'>Administrators</h2>
			</div>

			{isLoading ? (
				<div className='space-y-4 py-32 max-w-[850px] mx-auto bg-red-500/0'>
					{[0, 0, 0, 0].map((_) => (
						<UserCardSkeleton />
					))}
				</div>
			) : users === null ? (
				<div className='py-20'>
					<div className='py-20 flex flex-col items-center gap-y-8'>
						<Icon
							icon='fxemoji:lock'
							fontSize={100}
							className='opacity-75'
						/>
						<p className='text-4xl md:text-7xl text-other/50 text-center font-black'>
							<span>Access level 2 required</span>
						</p>
					</div>
				</div>
			) : (
				<div className='space-y-4 py-32 max-w-[850px] mx-auto bg-red-500/0'>
					{users.map((user) => (
						<UserCard user={user} />
					))}
				</div>
			)}
		</div>
	)
}
export default Admins
