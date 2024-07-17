import { Skeleton } from "@mui/material"

const UserCardSkeleton = () => {
  return (
    <div className='w-full h-32 bg-white shadow-md rounded-md flex gap-x-4 px-4 items-center'>
		<div className=''>
			{/* <img
				className='w-full max-w-20 aspect-square rounded-full shadow-md shadow-black/75'
				// src={user.image}
                src=""
				alt=''
			/> */}
            <Skeleton variant="circular" width={60} height={60} animation="wave" />
		</div>
		<div className='w-3/5 md:w-2/5 text-other bg-red-500/0'>
			{/* <h4 className='font-bold'>{user.name}</h4> */}
            <Skeleton variant="text" width="100%" animation="wave"/>
            <Skeleton variant="text" width="100%" animation="wave"/>
			{/* <p className='text-gray-400'>{user.email}</p> */}
		</div>
		<div className='text-other w-1/5 md:w-1/6 ml-auto'>
			<div className='space-x-2 flex'>
				{/* <span className='font-bold'>Access Level:</span> */}
            <Skeleton variant="text" width="100%" animation="wave"/>
            <Skeleton variant="text" width="100%" animation="wave"/>
				{/* <span className='text-gray-500'>{user.accessLevel}</span> */}
			</div>
			{/* <div className='text-other font-bold '>{user.position}</div> */}
            <Skeleton variant="text" width="100%" animation="wave"/>
		</div>
	</div>
  )
}
export default UserCardSkeleton