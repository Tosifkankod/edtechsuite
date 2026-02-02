// Add this hook somewhere (e.g., hooks/useCourse.ts)
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../utils/api'
import { useToast } from '../../../components/ui/Alert'
import type { queryParams } from '../../../types/commonTypes';

const QUERY_KEY = "courses";



export const useSaveCourse = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (courseData: any) =>
            api.post('/course', courseData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            toast("course saved", 'success');
        }
    })
}

export const useCourses = (params: queryParams) => {
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

export const useSingleCourse = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: async () => {
            const res = await api.get(`/course/${id}`);
            return res.data.data;
        }
    })
}

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (courseId: number) => api.delete(`/course/${courseId}`),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast("deleted Successfully", "success")
        },
        onError: () => {
            toast("Could not delete course", "error");
        }
    })
}

export const useUpdateCourse = (id: String) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (courseData: any) =>
            api.patch(`/course/${id}`, courseData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            toast("course saved", 'success');
        }
    })
}