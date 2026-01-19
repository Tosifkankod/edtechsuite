import DataTable from "../../../components/ui/DataTable"
import { useCourses } from "../hooks/queryHook";

const CourseDetails = () => {


    const { data, isLoading } = useCourses({
        page: pageIndex + 1,
        limit: pageSize,
        sortBy,
        order: sortOrder,
    });

    return (
        <div>
            <DataTable />
        </div>
    )
}

export default CourseDetails