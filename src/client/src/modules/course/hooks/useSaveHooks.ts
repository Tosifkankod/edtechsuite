import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../utils/api";
import { queryClient } from "../../../utils/queryClient";

export const useSaveCourse = () => {
    return useMutation({
        mutationFn: (courseData: any) =>
            api.post('/course', courseData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
            alert('Course saved!')
        },

        onError: (err) => {
            alert('Error: ' + err.message)
        },
    })
}





















