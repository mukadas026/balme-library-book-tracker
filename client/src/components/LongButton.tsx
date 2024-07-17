import { FC } from "react"

const LongButton: FC<{text: string, onClick: () => void, customStyles?: string}> = ({text, onClick, customStyles}) => {
    console.log(customStyles)
    return (
        <button 
            onClick={onClick}
        className='w-full h-20 bg-white font-bold shadow-md p-4 rounded-md bg-size-200-vert bg-gradient-to-t from-white via-white to-other hover:text-white bg-bottom hover:bg-top transition-all duration-500'>
			/ {text} /
		</button>
	)
}
export default LongButton
