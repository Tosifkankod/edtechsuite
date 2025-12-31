// Add this hook somewhere (e.g., hooks/useCourse.ts)
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../utils/api'

export const useSaveCourse = () => {
    const queryClient = useQueryClient()

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