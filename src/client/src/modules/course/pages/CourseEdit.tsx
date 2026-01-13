import { useState, type ChangeEvent, type FormEvent } from "react"
import Input from "../../../components/ui/Input"
import { Save } from "lucide-react";
import { createSlug } from "../../../utils/generateSlug";
import { useSaveCourse } from "../hooks/queryHook";

const CourseEdit = () => {
    const [courseData, setCourseData] = useState({
        courseName: "",
        slug: "",
        courseDuration: "",
        courseFee: '',
        courseDescription: "",
    });
    const saveMutation = useSaveCourse();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCourseData((prev) => {
            if (e.target.name == "courseName") {
                return {
                    ...prev,
                    courseName: e.target.value,
                    slug: createSlug(e.target.value)
                }
            }
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            ...courseData,
            courseDuration: Number(courseData.courseDuration),
            courseFee: Number(courseData.courseFee),
        };
        saveMutation.mutate(payload)
    }

    return (
        <div className="h-full py-4 scroll-smooth">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Create/Update Course</h1>
                <p className="text-lg text-gray-600">Manage course details, curriculum and settings.</p>
            </div>

            <form onSubmit={handleOnSubmit} >
                <div className="px-4 flex justify-end">
                    <button disabled={saveMutation.isPending} className="bg-dark-angled gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm ">
                        <Save className="" size={17} />
                        {saveMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                </div>
                <div className="px-4 py-6 shadow-sm my-2 bg-white rounded-md w-1/2">
                    <p className="text-lg mb-4 font-bold">Course Information</p>
                    <div className="mt-2">
                        <Input
                            value={courseData.courseName}
                            name="courseName"
                            className="border-gray-300 mb-0" type="text"
                            onChange={handleOnChange}
                            placeholder='Full Stack'
                            label='Course Name'
                            required={true}
                        />
                        <span className="text-xs font-normal text-red-600">Email must be a valid email address</span>

                        <div className="py-2 w-full"></div>

                        <div className="flex w-full gap-1">
                            <div className="w-full">
                                <Input
                                    className="w-full border-gray-300 mb-0"
                                    value={courseData.slug}
                                    name="courseSlug"
                                    label="Slug"
                                    type="text"
                                    onChange={handleOnChange}
                                    placeholder='Full Stack'
                                    required={true}
                                />
                                <span className="text-xs font-normal text-red-600">slug already exist</span>
                            </div>

                        </div>

                        <div className="py-2 w-full"></div>

                        <div className="flex gap-2">
                            <div className="w-full">
                                <Input
                                    className="mb-0"
                                    value={courseData.courseDuration}
                                    name="courseDuration"
                                    type="number"
                                    onChange={handleOnChange}
                                    placeholder='duration in days'
                                    label="Course Duration"
                                    required={true}
                                />
                                <span className="text-xs font-normal text-red-600">provide valid date</span>
                            </div>

                            <div className="w-full" >
                                <Input
                                    className="mb-0"
                                    value={courseData.courseFee}
                                    name="courseFee"
                                    type="number"
                                    onChange={handleOnChange}
                                    placeholder='5000'
                                    label="Course Fee"
                                    required={true}
                                />
                                <span className="text-xs font-normal text-red-600">provide valid fee</span>
                            </div>
                        </div>

                        <div className="py-2 w-full"></div>

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