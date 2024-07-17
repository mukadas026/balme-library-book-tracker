import { FC } from "react"

const UserCard: FC<{user: IUser}> = ({user}) => {
  return (
    <div className='w-full h-32 bg-white shadow-md rounded-md flex gap-x-4 px-4 items-center'>
		<div className=''>
			<img
				className='w-full max-w-20 aspect-square rounded-full shadow-md shadow-black/75'
				src={user.image}
				alt=''
			/>
		</div>
		<div className='flex-1 text-other'>
			<h4 className='font-bold'>{user.name}</h4>
			<p className='text-gray-400'>{user.email}</p>
		</div>
		<div className='text-other'>
			<div className='space-x-2'>
				<span className='font-bold'>Access Level:</span>
				<span className='text-gray-500'>{user.accessLevel}</span>
			</div>
			<div className='text-other font-bold '>{user.position}</div>
		</div>
	</div>
  )
}
export default UserCard