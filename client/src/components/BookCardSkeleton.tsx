import { Skeleton } from "@mui/material"

const BookCardSkeleton = () => {

	return (
		<div className='w-full flex justify-between h-20 shadow-sm items-center'>
			
			<div>
				<div className='w-32 flex justify-center'>
                    {/* <Skeleton variant="rounded" animation="wave" width="100%" height="100%" /> */}
                    <Skeleton variant="rounded" animation="wave" width={70} height={15} />
                </div>
			</div>
			<div className=''>
				<div className='w-32 flex justify-center'>
                    {/* <Skeleton variant="rounded" animation="wave" width="100%" height="100%" /> */}
                    <Skeleton variant="rounded" animation="wave" width={70} height={15} />
                </div>
			</div>
			<div>
				<div className='w-32 flex justify-center'>
                    {/* <Skeleton variant="rounded" animation="wave" width="100%" height="100%" /> */}
                    <Skeleton variant="rounded" animation="wave" width={70} height={15} />
                </div>
			</div>
			<div>
				<div className='w-32 flex justify-center'>
                    {/* <Skeleton variant="rounded" animation="wave" width="100%" height="100%" /> */}
                    <Skeleton variant="rounded" animation="wave" width={70} height={15} />
                </div>
			</div>
			<div>
				<div className='w-32 flex justify-center'>
                    <Skeleton variant="rounded" animation="wave" width={70} height={15} />
                </div>
			</div>
			
			<div className=''>
				<div className='w-32 text-center '>
					
					
				</div>
			</div>
		</div>
	)
}
export default BookCardSkeleton
