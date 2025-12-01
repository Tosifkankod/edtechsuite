import { ChevronDown } from "lucide-react";

const Sidebar = () => {
    return (
        <div className='w-20 group hover:w-54 transition-all duration-500 rounded-md h-full border border-gray-200 shadow-sm flex flex-col'>
            <div className='w-[80%] text-center pt-4 mx-auto flex text-lg'>
                <p className='font-medium group-hover:w-0 overflow-hidden group-hover:opacity-0'>EXS</p>
                <p className='max-w-0 
                    opacity-0
                    overflow-hidden
                    group-hover:max-w-[200px]
                    group-hover:opacity-100
                    transition-all
                    duration-500
                    font-medium'
                >
                    EdtechXSuite
                </p>
            </div>
            <hr className='my-3 w-[90%] mx-auto text-gray-300' />
            <ul className='cursor-pointer'>
                <li className='hover:bg-gray-100 py-2 transition-bg duration-300 rounded-md px-2 w-[90%] mx-auto p-1 flex items-center gap-2'>
                <div className='min-w-8 h-8 rounded-full overflow-hidden'>
                    <img className='w-full h-full object-fill' src="https://demos.creative-tim.com/material-dashboard-pro-react/static/media/team-3.0ef0be95e6850814c79e.jpg" alt="" />
                </div>
                <p className='text-xs opacity-0 w-0 text-nowrap group-hover:opacity-100 transition-all duration-500 group-hover:w-auto overflow-hidden'>
                    Brooklyn Alice
                </p>
                <ChevronDown className="w-0 opacity-0 group-hover:opacity-100  group-hover:w-4 duration-500 ml-auto" />
            </li>
            <hr className='my-3 w-[90%] mx-auto text-gray-300' />

            </ul>
        </div>
    )
}

export default Sidebar