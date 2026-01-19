import { Pencil, Trash2 } from "lucide-react";
import type { Course } from "../../modules/course/pages/CourseIndex";

interface ActionDropdownProps {
    course: Course;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ActionDropdown({ course, isOpen, onOpenChange }: ActionDropdownProps) {
    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => onOpenChange(!isOpen)}
            >⋮</button>
            {
                isOpen && (
                    <div
                        className="absolute left-0 z-20 mt-1 w-25 rounded-md bg-white shadow-md"
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                onOpenChange(false);
                            }
                        }}
                        tabIndex={-1}
                    >
                        <div className="py-1">
                            <button
                                className="flex items-center gap-2 w-full px-2 py-2 text-left text-xs text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    console.log("Edit course", course.courseId);
                                    onOpenChange(false);
                                }}
                            >
                                <Pencil size={14} />
                                Edit
                            </button>

                            <button
                                className="flex gap-2 items-center w-full px-2 py-2 text-left text-xs text-red-700 hover:bg-gray-100"
                                onClick={() => {
                                    console.log("Delete course", course.courseId);
                                    onOpenChange(false);
                                }}
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
}