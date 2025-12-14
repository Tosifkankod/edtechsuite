import { useState } from "react"
import Input from "../../../components/ui/Input"
import SelectInput from "../../../components/ui/SelectInput";
import { Save } from "lucide-react";

const CourseEdit = () => {
    const [name, setName] = useState('');

    return (
        <div className="h-full py-4">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Courses Setup</h1>
                <p className="text-lg text-gray-600">Manage course details, curriculum and settings.</p>
            </div>

            <div className="px-4 flex justify-end">
                <button className="bg-blue-500 gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm ">
                    <Save className="" size={17} />
                    Save Changes
                </button>
            </div>

            <div className="px-4 py-6 shadow-sm m-2 bg-white rounded-md w-1/2">
                <p className="text-lg mb-4 font-bold">Course Information</p>
                <div className="mt-2">
                    <Input disable={true} value={name} name="course Name" className="border-gray-300" type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Full Stack' label='Course Name' required={true} />

                    <div className="py-1 w-full"></div>

                    <p className="text-sm font-medium mt-2">Slug</p>
                    <div className="flex w-full gap-1">
                        <Input className="w-full border-gray-300" value={name} name="course Name" type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Full Stack' required={true} />
                        <Input className="w-full " value={name} name="course Name" type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Full Stack' required={true} />
                    </div>

                    <div className="py-1 w-full"></div>

                    <div className="flex items-end gap-2">
                        <Input className="" value={name} name="course Name" type="number" onChange={(e) => { setName(e.target.value) }} placeholder='Full Stack' label="Course Duration" required={true} />
                        <SelectInput option={[{ label: 'Weeks', value: 'WK' }]} name="week" className="" />
                        <Input className="flex-1" value={name} name="course Name" type="number" onChange={(e) => { setName(e.target.value) }} labelClassName="" placeholder='Weeks' label="Course Fee" required={true} />
                    </div>

                    <div className="py-1 w-full"></div>

                    <div className="flex gap-2">
                        <SelectInput option={[{ label: 'Weeks', value: 'WK' }]} name="week" className="" label="Course Status" />
                        <SelectInput option={[{ label: 'Weeks', value: 'WK' }]} name="Wilson Yadav" className="" label="Course Trainer" />
                    </div>

                    <div className="py-1 w-full"></div>

                    <div>
                        <Input label="Course Description" type="textarea" name="description" value={name} onChange={() => { }} placeholder="Course Description" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseEdit