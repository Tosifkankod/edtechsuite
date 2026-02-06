import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import { useStudents } from '../hooks/queryHooks';
import LimitDropdown from '../../../components/ui/LimitDropdown';
import ActionDropdown from '../../../components/ui/ActionDropdown';
import DataTable from '../../../components/ui/DataTable';

export interface Student {
    id: number;
    studentName: string;
    email: string;
    phone: string
    gender: string
    createdAt: string
}

const StudentIndex = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [openActionRowId, setOpenActionRowId] = useState<number | null>(null);


    const { data, isLoading } = useStudents({
        page: pageIndex + 1,
        limit: pageSize,
        sortBy: sorting[0]?.id,
        order: sorting[0]?.desc ? "DESC" : "ASC",
    });


    const studentColumns: ColumnDef<Student>[] = [
        {
            accessorKey: "id",
            header: 'student Id'
        },
        {
            accessorKey: "studentName",
            header: "student Name"
        },
        {
            accessorKey: "email",
            header: "email Id"
        },
        {
            accessorKey: "phone",
            header: "phone No."
        },
        {
            accessorKey: "gender",
            header: "gender"
        },
        {
            id: 'actions',
            header: "Action",
            enableSorting: false,
            cell: ({ row }) => {
                const course = row.original;
                const isOpen = openActionRowId === course.id;
                return (
                    <ActionDropdown<Student>
                        data={course}
                        isOpen={isOpen}
                        api="/student"
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
    ]

    return (
        <div className="h-full py-4 scroll-smooth">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Manage Students</h1>
                <p className="text-lg text-gray-600">
                    Manage students details.
                </p>
            </div>

            {
                isLoading ? (
                    <div className="flex mt-30 items-center justify-center">
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
                            role="status">
                            <span
                                className="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!"
                            >Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="px-4 flex justify-end">
                            <NavLink
                                to="add"
                                className="bg-dark-angled hover:shadow-xl hover:shadow-gray-400 duration-300 gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm"
                            >
                                <Plus className="" size={17} />
                                Add Student
                            </NavLink>
                        </div>
                        <div className=" py-6 shadow-sm my-2 mt-8 bg-white rounded-md w-full">
                            <DataTable<Student>
                                columns={studentColumns}
                                data={data?.students ?? []}
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
                )
            }
        </div>
    );
};


export default StudentIndex