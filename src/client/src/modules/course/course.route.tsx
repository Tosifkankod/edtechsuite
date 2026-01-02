import CourseDetails from "./pages/CourseDetails";
import CourseEdit from "./pages/CourseEdit";
import CourseIndex from "./pages/CourseIndex";

export const courseRoutes = [
    {
        path: '',
        element: <CourseIndex />
    },
    {
        path: ':courseId',
        element: <CourseDetails />
    },
    {
        path: ':courseId/edit',
        element: <CourseEdit />
    },
    {
        path: 'add',
        element: <CourseEdit />
    }
]