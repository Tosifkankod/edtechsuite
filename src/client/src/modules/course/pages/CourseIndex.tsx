import { Plus } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useCourses } from "../hooks/queryHook"
import type { ColumnDef } from "@tanstack/react-table"
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type SortingState,
} from "@tanstack/react-table"
import { useState } from "react"

export interface Course {
    courseId: number
    courseName: string
    courseFee: number
    courseDuration: number
    createdAt: string
}

export const courseColumns: ColumnDef<Course>[] = [
    {
        accessorKey: "courseName",
        header: "Course Name",
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
]

const CourseTable = () => {
    const [pageIndex, setPageIndex] = useState(0)
    const [sorting, setSorting] = useState<SortingState>([])
    const sortBy = sorting[0]?.id
    const sortOrder = sorting[0]?.desc ? "DESC" : "ASC"

    const { data, isLoading } = useCourses({
        page: pageIndex + 1,
        limit: 10,
        sortBy,
        order: sortOrder
    })
    console.log(data)
    const table = useReactTable({
        data: data?.data ?? [],
        columns: courseColumns,
        pageCount: data?.meta?.totalPages ?? -1,
        manualPagination: true,
        manualSorting: true,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="space-y-4">
            <table className="w-full border rounded-md">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="p-3 text-left cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getIsSorted() === "asc" && " 🔼"}
                                    {header.column.getIsSorted() === "desc" && " 🔽"}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-t">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="p-3">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


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
                    <CourseTable />
                </div>
            </div>
        </div >
    )
}

export default CourseIndex

