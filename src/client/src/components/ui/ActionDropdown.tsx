import { useState } from "react"
import type { Course } from "../../modules/course/pages/CourseIndex"
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const ActionDropdown = (course: { course: Course }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            {/* Trigger */}
            <button
                onClick={() => { setOpen(!open) }}
                className="p-2 rounded-md hover:bg-gray-100"
            >
                <MoreVertical size={16} />
            </button>

            {/* Dropdown */}
            {
                open && (
                    <div
                        className="absolute left-0 z-20 mt-2 w-32 rounded-md bg-white shadow-md"
                        onMouseLeave={(e) => { e.stopPropagation(); setOpen(false) }}
                    >

                        {/* Edit */}
                        <NavLink
                            to={`edit/${'3'}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
                        >
                            <Pencil size={14} />
                            Edit
                        </NavLink>

                        {/* delete */}
                        <button
                            onClick={() => {
                                setOpen(false);
                                if (confirm("Delete this course?")) {
                                    console.log("DELETE:");
                                    // deleteCourse(course.courseId)
                                }
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <Trash2 size={14} />
                            Delete
                        </button>

                    </div>
                )
            }

        </div>
    )
}

export default ActionDropdown