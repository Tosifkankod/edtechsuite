import { useMutation, usePrefetchQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../../components/ui/Alert";
import { api } from "../../../utils/api";
import { AxiosError } from "axios";
import type { queryParams } from "../../../types/commonTypes";

const QUERY_KEY = "student";

export const useSaveStudent = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (studentData: any) => api.post('/student', studentData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            toast('student saved', 'success');
        }
        // onError: (error) => {
        //     let message = 'Something went wrong';
        //     if (error instanceof AxiosError) {
        //         message = error.response?.data?.message || error.response?.data?.error || error.message;
        //     }
        //     toast(message, 'error');
        // }
    })
}

export const useGetSingleStudent = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: async () => {
            const res = await api.get(`/student/${id}`);
            return res.data.data
        }
    })
}

export const useStudents = (params: queryParams) => {
    return useQuery({
        queryKey: [QUERY_KEY, params],
        queryFn: async () => {
            const res = await api.get('/student', {
                params
            });
            return res.data.data
        },
        placeholderData: (previousData) => previousData
    })

}

export const useDeleteStudent = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (studentId: number) => api.delete(`/student/${studentId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            toast('student deleted successfully', 'success')
        },
        onError: (error) => {
            console.log(error)
            toast("Could not delete course", "error");
        }
    })
}


export const useUpdateStudent = (id: String) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (studentData: any) =>
            api.patch(`/student/${id}`, studentData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            toast("course saved", 'success');
        }
    })
}