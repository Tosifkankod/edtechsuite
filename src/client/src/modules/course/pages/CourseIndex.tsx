import { NavLink } from "react-router-dom";
import ActionDropdown from "../../../components/ui/ActionDropdown";
import DataTable from "../../../components/ui/DataTable";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useCourses } from "../hooks/queryHook";
export interface Course {
    id: number,
    courseName: string;
    courseFee: number;
    courseDuration: number;
    createdAt: string;
}

const CourseIndex = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [openActionRowId, setOpenActionRowId] = useState<number | null>(null);

    const { data, isLoading } = useCourses({
        page: pageIndex + 1,
        limit: pageSize,
        sortBy: sorting[0]?.id,
        order: sorting[0]?.desc ? "DESC" : "ASC",
    });


    const courseColumns: ColumnDef<Course>[] = [
        {
            accessorKey: "courseName",
            header: "Course Name",
            size: 400
        },
        {
            accessorKey: "courseFee",
            header: "Fee",
            cell: ({ row }) => `₹ ${row.original.courseFee}`,
        },
        {
            accessorKey: "courseDuration",
            header: "Duration (Days)",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
        },
        {
            id: 'actions',
            header: "Action",
            enableSorting: false,
            cell: ({ row }) => {
                const course = row.original;
                const isOpen = openActionRowId === course.id;
                return (
                    <ActionDropdown<Course>
                        data={course}
                        isOpen={isOpen}
                        api="/course"
                        onOpenChange={(shouldOpen: boolean) => {
                            if (shouldOpen) {
                                setOpenActionRowId(course.id);
                            } else {
                                setOpenActionRowId(null);
                            }
                        }}
                    />
                );
            }
        }
    ];

    return (
        <div className="h-full py-8 scroll-smooth">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Manage Courses</h1>
                <p className="text-lg text-gray-600">
                    Manage course details, curriculum and settings.
                </p>
            </div>
            <div>
                <div className="px-4 flex justify-end">
                    <NavLink
                        to="add"
                        className="bg-dark-angled hover:shadow-xl hover:shadow-gray-400 duration-300 gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm "
                    >
                        <Plus className="" size={17} />
                        Add Course
                    </NavLink>
                </div>
                <div className="py-6 shadow-sm my-8 bg-white rounded-md w-full">
                    <DataTable<Course>
                        columns={courseColumns}
                        data={data?.courses ?? []}
                        pageCount={data?.meta?.totalPages ?? 0}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPageIndex={setPageIndex}
                        setPageSize={setPageSize}
                        isLoading={isLoading}
                        sorting={sorting}
                        setSorting={setSorting}
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseIndex;
