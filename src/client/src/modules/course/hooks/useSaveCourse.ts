// Add this hook somewhere (e.g., hooks/useCourse.ts)
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../utils/api'
import { useToast } from '../../../components/ui/Alert'

export const useSaveCourse = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast();

    return useMutation({
        mutationFn: (courseData: any) =>
            api.post('/course', courseData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
            toast("course saved", 'success');
        },
        onError: (err) => {
            toast(err.message, 'error');
        },
    })
}