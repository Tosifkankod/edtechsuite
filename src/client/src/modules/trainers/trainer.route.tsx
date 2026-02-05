import TrainerIndex from "./pages/TrainerIndex";
import TrainerEdit from "./pages/TrainerEdit";
import TrainerDetails from "./pages/TrainerDetails";

export const trainerRoutes = [
    {
        path: '',
        element: <TrainerIndex />
    },
    {
        path: ':tainerId',
        element: <TrainerDetails />
    },
    {
        path: 'edit/:trainerId',
        element: <TrainerEdit />
    },
    {
        path: 'add',
        element: <TrainerEdit />
    }
]