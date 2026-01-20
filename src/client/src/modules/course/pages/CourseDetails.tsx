import { useState, type ReactNode } from 'react';
import DataTable from '../../../components/ui/DataTable'
import type { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import { useCourses } from '../hooks/queryHook';
import ActionDropdown from '../../../components/ui/ActionDropdown';

export interface Course {
    id: string,
    courseId: number;
    courseName: string;
    courseFee: number;
    courseDuration: number;
    createdAt: string;
}


const CourseDetails = () => {
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
                const isOpen = openActionRowId === course.courseId;
                return (
                    <ActionDropdown<Course>
                        data={course}
                        isOpen={isOpen}
                        onOpenChange={(shouldOpen: boolean) => {
                            if (shouldOpen) {
                                setOpenActionRowId(course.courseId);
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
        <DataTable<Course>
            columns={courseColumns} // ← your existing columns
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
    );
}

export default CourseDetails