import { useNavigate } from "react-router-dom"
import LongButton from "../../components/LongButton"

const Users = () => {
	const navigate = useNavigate()
	return (
		<div className="py-16">
			<div className=''>
				<h2 className='text-4xl text-other font-black text-center'>Registered Users</h2>
			</div>
			<div className="space-y-4 py-32 max-w-[700px] mx-auto">
                <LongButton text="Administrators" onClick={() => {navigate("admins")}}/>
                <LongButton text="Regular Users" onClick={() => {navigate("others")}}/>
				
			</div>
		</div>
	)
}
export default Users
