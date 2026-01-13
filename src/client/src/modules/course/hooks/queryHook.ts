// Add this hook somewhere (e.g., hooks/useCourse.ts)
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../utils/api'
import { useToast } from '../../../components/ui/Alert'

const QUERY_KEY = "courses";

type CourseQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: 'ASC' | 'DESC';
};

export const useSaveCourse = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast();

    return useMutation({
        mutationFn: (courseData: any) =>
            api.post('/course', courseData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            toast("course saved", 'success');
        },
        onError: (err) => {
            toast(err.message, 'error');
        },
    })
}

export const useCourses = (params: CourseQueryParams) => {
    return useQuery({
        queryKey: [QUERY_KEY, params],
        queryFn: async () => {
            const res = await api.get('/course', {
                params,
            });
            return res.data.data;
        },
        placeholderData: (previousData) => previousData
    });
}
