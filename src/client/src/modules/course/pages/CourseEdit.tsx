import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import Input from "../../../components/ui/Input"
import { Save } from "lucide-react";
import { createSlug } from "../../../utils/generateSlug";
import { useSaveCourse, useSingleCourse } from "../hooks/queryHook";
import { useToast } from "../../../components/ui/Alert";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

const CourseEdit = () => {
    const { courseId } = useParams();
    const isEdit = Boolean(courseId);
    const [courseData, setCourseData] = useState({
        courseName: "",
        slug: "",
        courseDuration: "",
        courseFee: '',
        courseDescription: "",
    });
    const { data, isLoading } = useSingleCourse(String(courseId));
    const [formErors, setFormErrors] = useState<Record<string, string>>({});
    const saveMutation = useSaveCourse();
    const { toast } = useToast();

    useEffect(() => {
        if (data && isEdit) {
            console.log(data)
            setCourseData({
                courseName: data.courseName ?? '',
                slug: data.slug ?? '',
                courseDuration: data.courseDuration ?? '',
                courseFee: data.courseFee ?? '',
                courseDescription: data.courseDescription ?? ''
            })
        }
    }, [data, isEdit])

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

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            ...courseData,
            courseDuration: Number(courseData.courseDuration),
            courseFee: Number(courseData.courseFee),
        };
        setFormErrors({});
        try {
            await saveMutation.mutateAsync(payload)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast(error.response?.data.message, 'error');
                const errors = error.response?.data.error;
                console.log(errors)
                if (errors) {
                    setFormErrors(errors);
                }
            }
        }
    }

    if (isEdit && isLoading) {
        return <p>Loading course data...</p>;
    }

    return (
        <div className="h-full py-4 scroll-smooth">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Create/Update Course</h1>
                <p className="text-lg text-gray-600">Manage course details, curriculum and settings.</p>
            </div>

            <form onSubmit={handleOnSubmit} >
                <div className="px-4 flex justify-end">
                    <button disabled={saveMutation.isPending} className="bg-dark-angled hover:shadow-xl hover:shadow-gray-400 duration-300 cursor-pointer gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm ">
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
                        {
                            formErors.courseName &&
                            <span className="text-xs font-normal text-red-600">{formErors.courseName}</span>
                        }

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
                                {
                                    formErors.courseSlug &&
                                    <span className="text-xs font-normal text-red-600">{formErors.courseSlug}</span>
                                }
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
                                {
                                    formErors.courseDuration &&
                                    <span className="text-xs font-normal text-red-600">{formErors.courseDuration}</span>
                                }
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
                                {
                                    formErors.courseFee &&
                                    <span className="text-xs font-normal text-red-600">{formErors.courseFee}</span>
                                }
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
                            {
                                formErors.courseDescription &&
                                <span className="text-xs font-normal text-red-600">{formErors.courseDescription}</span>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CourseEdit