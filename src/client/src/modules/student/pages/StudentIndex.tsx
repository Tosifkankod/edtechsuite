import { Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const StudentIndex = () => {
    return (
        <div className="h-full py-4 scroll-smooth">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Manage Students</h1>
                <p className="text-lg text-gray-600">
                    Manage students details.
                </p>
            </div>
            <div>
                <div className="px-4 flex justify-end">
                    <NavLink
                        to="add"
                        className="bg-dark-angled gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm "
                    >
                        <Plus className="" size={17} />
                        Add Coruse
                    </NavLink>
                </div>
                <div className=" py-6 shadow-sm my-2 mt-8 bg-white rounded-md w-full">
                </div>
            </div>
        </div>
    );
};


export default StudentIndex