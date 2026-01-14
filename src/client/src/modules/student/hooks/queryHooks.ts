import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../../components/ui/Alert";
import { api } from "../../../utils/api";
import { AxiosError } from "axios";

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