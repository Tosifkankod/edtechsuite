import StudentIndex from "./pages/StudentIndex";
import StudentDetails from "./pages/StudentDetails";
import StudentEdit from "./pages/StudentEdit";

export const studentRoutes = [
    {
        path: '',
        element: <StudentIndex />
    },
    {
        path: ':studentId',
        element: <StudentDetails />
    },
    {
        path: 'edit/:studentId',
        element: <StudentEdit />
    },
    {
        path: 'add',
        element: <StudentEdit />
    }
]