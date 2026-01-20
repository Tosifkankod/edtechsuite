import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type Row, type SortingState } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import LimitDropdown from "./LimitDropdown";

interface PaginationProps {
    pageIndex: number;
    pageCount: number;
    setPageIndex: Dispatch<SetStateAction<number>>;
}

function TablePagination({ pageIndex, pageCount, setPageIndex }: PaginationProps) {
    if (pageCount <= 1) return null;

    return (
        <div className="flex justify-end px-4 items-center gap-2">
            {pageIndex > 0 && (
                <button
                    className="w-8 h-8 cursor-pointer border p-2 rounded-full flex items-center hover:bg-gray-100 justify-center border-gray-400"
                    onClick={() => setPageIndex((prev) => prev - 1)}
                >
                    <ChevronLeft size={16} />
                </button>
            )}

            {Array.from({ length: pageCount }).map((_, index) => {
                const isActive = index === pageIndex;
                return (
                    <button
                        key={index}
                        onClick={() => setPageIndex(index)}
                        className={`w-8 h-8 text-sm flex items-center justify-center border rounded-full
              ${isActive
                                ? "bg-dark-angled text-white border-black"
                                : "bg-white text-gray-400 border-gray-400 hover:bg-gray-100"
                            }`}
                    >
                        {index + 1}
                    </button>
                );
            })}

            {pageIndex + 1 < pageCount && (
                <button
                    className="w-8 h-8 p-2 cursor-pointer flex items-center justify-center border rounded-full hover:bg-gray-100 border-gray-400"
                    onClick={() => setPageIndex((prev) => prev + 1)}
                >
                    <ChevronRight size={16} />
                </button>
            )}
        </div>
    );
}

type DataTableProps<TData> = {
    columns: ColumnDef<TData>[];
    data: TData[];
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    setPageIndex: Dispatch<SetStateAction<number>>;
    setPageSize: Dispatch<SetStateAction<number>>;
    isLoading: boolean;
    emptyMessage?: ReactNode;
    renderActions?: (row: Row<TData>) => ReactNode;
    className?: string;
    sorting: SortingState,
    setSorting: Dispatch<SetStateAction<SortingState>>;
    showLimitDropdown?: boolean;
}

const DataTable = <TData,>({
    columns,
    data,
    pageCount,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    isLoading = false,
    emptyMessage = "No records found",
    renderActions,
    sorting,
    setSorting,
    className = "",
    showLimitDropdown = true
}: DataTableProps<TData>) => {

    const finalColumns = renderActions ? columns.map((col) =>
        col.id === "actions"
            ? {
                ...col,
                cell: ({ row }: { row: Row<TData> }) => renderActions(row),
            }
            : col
    ) : columns;

    const table = useReactTable({
        data,
        columns: finalColumns,
        pageCount,
        manualPagination: true,
        manualSorting: true,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Controls row: limit dropdown + future filters/search */}
            <div className="px-4 flex items-center justify-between">
                {showLimitDropdown && (
                    <div className="flex items-center">
                        <LimitDropdown
                            value={pageSize}
                            onChange={(val) => {
                                setPageSize(val);
                                setPageIndex(0);
                            }}
                        />
                        <span className="text-xs ml-2 text-gray-400">entries per page</span>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className=" rounded-md border">
                <table className="w-full">
                    <thead className="text-xs text-gray-400 font-normal bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="p-3 px-4 text-left cursor-pointer select-none"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </span>

                                            {header.column.getCanSort() && (
                                                <div className="flex flex-col leading-none">
                                                    <span
                                                        className={`w-0 h-0 border-l-4 border-r-4 border-b-[5px] border-l-transparent border-r-transparent ${header.column.getIsSorted() === "asc"
                                                            ? "border-b-black"
                                                            : "border-b-gray-300"
                                                            }`}
                                                    />
                                                    <span
                                                        className={`w-0 h-0 mt-1 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent ${header.column.getIsSorted() === "desc"
                                                            ? "border-t-black"
                                                            : "border-t-gray-300"
                                                            }`}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows?.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-10 text-gray-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="text-sm border-y border-gray-100 text-gray-600 hover:bg-gray-50/70"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="p-3 px-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <TablePagination
                pageIndex={pageIndex}
                pageCount={pageCount}
                setPageIndex={setPageIndex}
            />
        </div>
    );
}

export default DataTable