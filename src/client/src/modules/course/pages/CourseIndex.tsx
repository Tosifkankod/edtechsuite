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
import LimitDropdown from "../../../components/ui/LimitDropdown"

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

interface Props {
    pageIndex: number
    pageCount: number
    setPageIndex: (page: number) => void
}

const PAGE_SIZES = [3, 6, 9, 12];

export const TablePagination = ({ pageIndex, pageCount, setPageIndex }: Props) => {
    return (
        <div className="flex justify-end gap-2">
            <button
                className="px-3 py-1 border rounded"
                disabled={pageIndex === 0}
                onClick={() => setPageIndex(prev => prev - 1)}
            >
                Prev
            </button>

            <span className="px-3 py-1">
                Page {pageIndex + 1} of {pageCount}
            </span>

            <button
                className="px-3 py-1 border rounded"
                disabled={pageIndex + 1 >= pageCount}
                onClick={() => setPageIndex(prev => prev + 1)}
            >
                Next
            </button>
        </div>
    )
}

const CourseTable = () => {
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sorting, setSorting] = useState<SortingState>([])

    const sortBy = sorting[0]?.id
    const sortOrder = sorting[0]?.desc ? "DESC" : "ASC"

    const { data, isLoading } = useCourses({
        page: pageIndex + 1,
        limit: pageSize,
        sortBy,
        order: sortOrder
    })

    const table = useReactTable({
        data: data?.courses ?? [],
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
            {/* <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-2">
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value))
                            setPageIndex(0)
                        }}
                        className="border rounded px-3 py-2 border-gray-300 outline-none text-sm"
                    >
                        {
                            PAGE_SIZES.map(size => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))
                        }
                    </select>
                    <span className="text-xs text-gray-600">entries per page</span>
                </div>
            </div> */}

            <div className="px-4">
                <LimitDropdown
                    value={pageSize}
                    onChange={(val) => {
                        setPageSize(val)
                        setPageIndex(0)
                    }}
                />
                <span className="text-xs ml-2 text-gray-400">entries per page</span>
            </div>

            <table className="w-full rounded-md">
                <thead className="text-sm text-gray-400 font-normal">
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="p-3 px-4 text-left cursor-pointer"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() === "asc" && " 🔼"}
                                            {header.column.getIsSorted() === "desc" && " 🔽"}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="text-sm border-y border-gray-100 text-gray-500">
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="p-3 px-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <TablePagination
                pageIndex={pageIndex}
                pageCount={table.getPageCount()}
                setPageIndex={setPageIndex}
            />
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
                        className="inline-flex w-fit bg-dark-angled gap-2 shadow-md hover:shadow-xl shadow-gray-300 duration-400 rounded-md py-2 items-center justify-center text-white px-4 text-sm"
                    >
                        <Plus width={15} />

                        Add Course
                    </NavLink>
                </div>
                <div className=" py-6 shadow-sm my-2 mt-8 bg-white rounded-md w-full">
                    <CourseTable />
                </div>
            </div>
        </div >
    )
}

export default CourseIndex

