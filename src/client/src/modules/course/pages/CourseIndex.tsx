import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCourses } from "../hooks/queryHook";
import type { ColumnDef } from "@tanstack/react-table";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type SortingState,
} from "@tanstack/react-table";
import { useState, type Dispatch, type SetStateAction } from "react";
import LimitDropdown from "../../../components/ui/LimitDropdown";

export interface Course {
    courseId: number;
    courseName: string;
    courseFee: number;
    courseDuration: number;
    createdAt: string;
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
];

interface Props {
    pageIndex: number;
    pageCount: number;
    setPageIndex: Dispatch<SetStateAction<number>>;
}

export const TablePagination = ({ pageIndex, pageCount, setPageIndex, }: Props) => {
    if (pageCount <= 1) return null

    return (
        <div className="flex justify-end px-4 items-center gap-2">
            {/* Prev (only if available) */}
            {pageIndex > 0 && (
                <button
                    className="w-8 h-8 cursor-pointer border p-2 rounded-full flex items-center hover:bg-gray-100 justify-center border-gray-400"
                    onClick={() => setPageIndex(prev => prev - 1)}
                >
                    <ChevronLeft size={16} />
                </button>
            )}

            {/* Page Numbers */}
            {Array.from({ length: pageCount }).map((_, index) => {
                const isActive = index === pageIndex

                return (
                    <button
                        key={index}
                        onClick={() => setPageIndex(index)}
                        className={`w-8 h-8 text-sm flex items-center justify-center  border rounded-full
              ${isActive
                                ? "bg-dark-angled text-white border-black"
                                : "bg-white text-gray-400 border-gray-400 hover:bg-gray-100"
                            }
            `}
                    >
                        {index + 1}
                    </button>
                )
            })}

            {/* Next (only if available) */}
            {pageIndex + 1 < pageCount && (
                <button
                    className="w-8 h-8 p-2 cursor-pointer flex items-center justify-center border rounded-full hover:bg-gray-100 border-gray-400"
                    onClick={() => setPageIndex(prev => prev + 1)}
                >
                    <ChevronRight size={16} />
                </button>
            )}
        </div>
    )
}

const CourseTable = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([]);

    const sortBy = sorting[0]?.id;
    const sortOrder = sorting[0]?.desc ? "DESC" : "ASC";

    const { data, isLoading } = useCourses({
        page: pageIndex + 1,
        limit: pageSize,
        sortBy,
        order: sortOrder,
    });

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
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="space-y-4">
            <div className="px-4">
                <LimitDropdown
                    value={pageSize}
                    onChange={(val) => {
                        setPageSize(val);
                        setPageIndex(0);
                    }}
                />
                <span className="text-xs ml-2 text-gray-400">entries per page</span>
            </div>

            <table className="w-full rounded-md">
                <thead className="text-xs text-gray-400 font-normal">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="p-3 px-4 text-left cursor-pointer select-none"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        {/* Header title */}
                                        <span>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </span>

                                        {/* Sort icons */}
                                        <div className="flex flex-col leading-none">
                                            {/* Up arrow */}
                                            <span
                                                className={`w-0 h-0 border-l-4 border-r-4 border-b-[5px] border-l-transparent border-r-transparent 
                                                    ${header.column.getIsSorted() ===
                                                        "asc"
                                                        ? "border-b-black"
                                                        : "border-b-gray-300"
                                                    }`}
                                            />

                                            {/* Down arrow */}
                                            <span
                                                className={`w-0 h-0 mt-1 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent ${header.column.getIsSorted() === "desc"
                                                    ? "border-t-black"
                                                    : "border-t-gray-300"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="text-sm border-y border-gray-100 text-gray-500"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-3 px-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <TablePagination
                pageIndex={pageIndex}
                pageCount={table.getPageCount()}
                setPageIndex={setPageIndex}
            />
        </div>
    );
};

const CourseIndex = () => {
    return (
        <div className="h-full py-4 scroll-smooth">
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
                        className="bg-dark-angled gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm "
                    >
                        <Plus className="" size={17} />
                        Add Coruse
                    </NavLink>
                </div>
                <div className=" py-6 shadow-sm my-2 mt-8 bg-white rounded-md w-full">
                    <CourseTable />
                </div>
            </div>
        </div>
    );
};

export default CourseIndex;
