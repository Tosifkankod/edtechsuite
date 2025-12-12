import CourseDetails from "./pages/courseDetails";
import CourseEdit from "./pages/courseEdit";

export const courseRoutes = [
    {
        path: '/course-details',
        element: <CourseDetails />
    },
    {
        path: '/course-edit/:courseId',
        element: <CourseEdit />
    }
]