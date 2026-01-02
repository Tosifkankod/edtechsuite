import { Plus } from "lucide-react"
import { NavLink } from "react-router-dom"

const CourseIndex = () => {
    return (
        <div className="h-full py-4">
            <NavLink
                to="add"
                className="inline-flex w-fit bg-dark-angled gap-2 rounded-md py-2 items-center justify-center text-white px-4 text-sm"
            >
                <Plus width={15} />
                Add Course
            </NavLink>
            <div className="px-4 py-6 shadow-sm m-2 mt-4 rounded-md bg-white">
                <h1>Course Index Page</h1>
                <NavLink to={'/course/234'} >course Details</NavLink>
                <NavLink to={'/course/234/edit'} >course Edit</NavLink>
            </div>
        </div>
    )
}

export default CourseIndex