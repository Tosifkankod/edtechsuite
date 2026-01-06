import { type ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type RowModel, type Table, flexRender } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import { NavLink } from "react-router-dom"

type User = {
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: string
}

const CourseIndex = () => {
    const [data] = useState<User[]>([
        { firstName: "Tanner", lastName: "Linsley", age: 33, visits: 100, progress: 50, status: "Married" },
        { firstName: "Kevin", lastName: "Vandy", age: 27, visits: 200, progress: 100, status: "Single" },
        { firstName: "John", lastName: "Doe", age: 29, visits: 150, progress: 70, status: "Single" },
        { firstName: "Jane", lastName: "Smith", age: 35, visits: 300, progress: 90, status: "Married" },
        { firstName: "Alex", lastName: "Brown", age: 24, visits: 80, progress: 40, status: "Single" },
        { firstName: "Emily", lastName: "Clark", age: 31, visits: 220, progress: 85, status: "Married" },
        { firstName: "Michael", lastName: "Scott", age: 45, visits: 777, progress: 95, status: "Married" },
        { firstName: "Dwight", lastName: "Schrute", age: 38, visits: 400, progress: 88, status: "Single" },
    ])
    const [globalFilter, setGlobalFilter] = useState("")

    const columns = useMemo<ColumnDef<User>[]>(() => [
        {
            accessorKey: "firstName",
            header: "First Name",
        },
        {
            accessorKey: "lastName",
            header: "Last Name",
        },
        {
            accessorKey: "age",
            header: "Age",
        },
        {
            accessorKey: "visits",
            header: "Visits",
        },
        {
            accessorKey: "progress",
            header: "Progress",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
    ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

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
                    <div className="p-6">
                        {/* Search */}
                        <div className="mb-4">
                            <input
                                value={globalFilter ?? ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search users..."
                                className="w-64 rounded border px-3 py-2 text-sm focus:outline-none focus:ring"
                            />
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto rounded border">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-100">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <th
                                                    key={header.id}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="cursor-pointer border-b px-4 py-2 text-left text-sm font-semibold"
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: " 🔼",
                                                        desc: " 🔽",
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>

                                <tbody>
                                    {table.getRowModel().rows.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50">
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="border-b px-4 py-2 text-sm">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex items-center gap-2">
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                            >
                                Next
                            </button>

                            <span className="ml-4 text-sm">
                                Page {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount()}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default CourseIndex

