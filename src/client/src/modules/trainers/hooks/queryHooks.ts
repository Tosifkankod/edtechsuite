import { useMutation, usePrefetchQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../../components/ui/Alert";
import { api } from "../../../utils/api";
import { AxiosError } from "axios";
import type { queryParams } from "../../../types/commonTypes";

const QUERY_KEY = "trainer";
const url = '/trainer';

export const useSaveTrainer = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (trainerData: any) => api.post(url, trainerData),
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

export const useGetSingleTrainer = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: async () => {
            const res = await api.get(`${url}/${id}`);
            return res.data.data
        }
    })
}

export const useTrainer = (params: queryParams) => {
    return useQuery({
        queryKey: [QUERY_KEY, params],
        queryFn: async () => {
            const res = await api.get(url, {
                params
            });
            return res.data.data
        },
        placeholderData: (previousData) => previousData
    })

}

export const useDeleteTrainer = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (trainerId: number) => api.delete(`${url}/${trainerId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            toast('trainer deleted successfully', 'success')
        },
        onError: (error) => {
            console.log(error)
            toast("Could not delete course", "error");
        }
    })
}


export const useUpdateTrainer = (id: String) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (trainerData: any) =>
            api.patch(`${url}/${id}`, trainerData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            toast("trainer saved", 'success');
        }
    })
}