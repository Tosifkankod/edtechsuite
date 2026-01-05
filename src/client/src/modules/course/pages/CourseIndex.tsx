import { Plus } from "lucide-react"
import { NavLink } from "react-router-dom"

const CourseIndex = () => {
    return (
        <div className="h-full py-4">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Manage Courses</h1>
                <p className="text-lg text-gray-600">Manage course details, curriculum and settings.</p>
            </div>

            <div>
                <div className="px-4 flex justify-end">
                    <NavLink
                        to="add"
                        className="inline-flex w-fit bg-dark-angled gap-2 rounded-md py-2 items-center justify-center text-white px-4 text-sm"
                    >
                        <Plus width={15} />
                        Add Course
                    </NavLink>
                </div>
                <div className="px-4 py-6 shadow-sm my-2 bg-white rounded-md w-full">

                </div>

            </div>
        </div >
    )
}

export default CourseIndex

