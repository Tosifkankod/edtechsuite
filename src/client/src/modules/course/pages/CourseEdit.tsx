import { useState, type ChangeEvent, type FormEvent } from "react"
import Input from "../../../components/ui/Input"
import SelectInput from "../../../components/ui/SelectInput";
import { Save } from "lucide-react";

const courseStatus = [
    {
        label: 'active',
        value: 'active'
    },
    {
        label: 'Inactive',
        value: 'inactive'
    }
]

const CourseEdit = () => {
    const [courseData, setCourseData] = useState({
        courseName: "",
        courseSlug: "",
        courseDuration: "",
        courseFee: '',
        courseStatus: null,
        courseDescription: "",
    });

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCourseData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })

    }

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(courseData)
    }

    return (
        <div className="h-full py-4">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Courses Setup</h1>
                <p className="text-lg text-gray-600">Manage course details, curriculum and settings.</p>
            </div>

            <form onSubmit={handleOnSubmit} >
                <div className="px-4 flex justify-end">
                    <button className="bg-blue-500 gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm ">
                        <Save className="" size={17} />
                        Save Changes
                    </button>
                </div>
                <div className="px-4 py-6 shadow-sm m-2 bg-white rounded-md w-1/2">
                    <p className="text-lg mb-4 font-bold">Course Information</p>
                    <div className="mt-2">
                        <Input
                            value={courseData.courseName}
                            name="courseName"
                            className="border-gray-300" type="text"
                            onChange={handleOnChange}
                            placeholder='Full Stack'
                            label='Course Name'
                            required={true}
                        />

                        <div className="py-1 w-full"></div>

                        <p className="text-sm font-medium mt-2">Slug</p>
                        <div className="flex w-full gap-1">
                            <Input
                                className="w-full border-gray-300"
                                value={courseData.courseSlug}
                                name="courseSlug"
                                type="text"
                                onChange={handleOnChange}
                                placeholder='Full Stack'
                                required={true}
                            />
                            <Input
                                className="w-full"
                                value={''}
                                name="course Name"
                                type="text"
                                onChange={handleOnChange}
                                placeholder='Full Stack'
                                disable={true}
                            />
                        </div>

                        <div className="py-1 w-full"></div>

                        <div className="flex items-end gap-2">
                            <Input
                                className=""
                                value={courseData.courseDuration}
                                name="courseDuration"
                                type="number"
                                onChange={handleOnChange}
                                placeholder='duration in days'
                                label="Course Duration"
                                required={true}
                            />
                            <Input
                                className="flex-1"
                                name="days"
                                onChange={handleOnChange}
                                labelClassName=""
                                placeholder='days'
                                label=""
                                value=""
                                type="input"
                                disable={true}
                            />

                            <Input
                                className="flex-1"
                                value={courseData.courseFee}
                                name="courseFee"
                                type="number"
                                onChange={handleOnChange}
                                placeholder='5000'
                                label="Course Fee"
                                required={true}
                            />
                        </div>

                        <div className="py-1 w-full"></div>
                        <div className="flex gap-2">
                            <SelectInput
                                option={courseStatus}
                                name="courseStatus"
                                className=""
                                label="Course Status"
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="py-1 w-full"></div>

                        <div>
                            <Input
                                label="Course Description"
                                type="textarea"
                                name="courseDescription"
                                value={courseData.courseDescription}
                                onChange={handleOnChange}
                                placeholder="Course Description"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CourseEdit