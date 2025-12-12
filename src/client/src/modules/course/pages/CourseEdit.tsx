import { useState } from "react"
import Input from "../../../components/ui/Input"

const CourseEdit = () => {
    const [name, setName] = useState('');

    return (
        <div className="h-full py-4">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Courses Setup</h1>
                <p className="text-lg text-gray-600">Manage course details, curriculum and settings.</p>
            </div>

            <div className="px-4 py-6 shadow-sm m-2 bg-white rounded-md w-1/2">
                <p className="text-lg mb-4 font-bold">Course Information</p>
                <div className="mt-2">
                    <Input disable={true} value={name} name="course Name" className="border-gray-300" type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Full Stack' label='Course Name' required={true} />

                    <p className="text-sm font-medium mt-2">Slug</p>
                    <div className="flex w-full gap-1">
                        <Input className="w-full border-gray-300" value={name} name="course Name" type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Full Stack' required={true} />
                        <Input className="w-full " value={name} name="course Name" type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Full Stack' required={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseEdit