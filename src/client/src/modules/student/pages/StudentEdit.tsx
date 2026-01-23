import { Save } from 'lucide-react'
import Input from '../../../components/ui/Input'
import SelectInput from '../../../components/ui/SelectInput'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useSaveStudent } from '../hooks/queryHooks';
import { AxiosError } from 'axios';
import { useToast } from '../../../components/ui/Alert';

const StudentEdit = () => {
    const [studentData, setStudentData] = useState({
        studentName: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        employmentStatus: ""
    })
    const [formErors, setFormErrors] = useState<Record<string, string>>({});

    const saveMutation = useSaveStudent();
    const { toast } = useToast();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStudentData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

        setFormErrors((prev) => {
            const copy = { ...prev };
            delete copy[e.target.name];
            return copy;
        });
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});
        try {
            await saveMutation.mutateAsync(studentData)
        } catch (error) {
            console.log("error")
            if (error instanceof AxiosError) {
                toast(error.response?.data.message, 'error');
                const errors = error.response?.data.error;
                console.log(errors)
                if (errors) {
                    setFormErrors(errors);
                }
            }
        }
        setStudentData({
            studentName: "",
            email: "",
            phone: "",
            address: "",
            gender: "",
            employmentStatus: ""
        })
    }

    return (
        <div className="h-full py-4 scroll-smooth">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Add Student</h1>
                <p className="text-lg text-gray-600">fill all required information</p>
            </div>
            <form onSubmit={handleOnSubmit} >
                <div className="px-4 flex justify-end">
                    <button className="bg-dark-angled gap-2 rounded-md hover:shadow-xl hover:shadow-gray-400 duration-300 cursor-pointer py-2 flex items-center justify-center text-white px-3 text-sm ">
                        <Save className="" size={17} />
                        Save Changes
                    </button>
                </div>
                <div className="px-4 py-6 shadow-sm my-2 bg-white rounded-md w-full">
                    <p className="text-lg mb-4 font-semibold">Student Information</p>
                    <div className="mt-2 flex gap-2">
                        <div className='w-full'>
                            <Input
                                type='text'
                                name='studentName'
                                label='Full Name'
                                value={studentData.studentName}
                                onChange={handleOnChange}
                                placeholder='John Doe'
                                className='mb-0'
                            />
                            {
                                formErors.studentName &&
                                <span className="text-xs font-normal text-red-600">{formErors.studentName}</span>
                            }
                        </div>
                        <div className='w-full'>
                            <Input
                                type='email'
                                name='email'
                                label='Email address'
                                value={studentData.email}
                                onChange={handleOnChange}
                                placeholder='johndoe@gmail.com'
                                className='mb-0'

                            />
                            {
                                formErors.email && <span className="text-xs font-normal text-red-600">{formErors.email}</span>
                            }
                        </div>
                    </div>
                    <div className="py-1 w-full"></div>
                    <div className="mt-2 flex gap-2">
                        <div className='w-full'>
                            <Input
                                type='text'
                                name='phone'
                                label='Phone Number'
                                className='mb-0'
                                value={studentData.phone}
                                onChange={handleOnChange}
                                placeholder='00000 00000'
                            />
                            {
                                formErors.phone && <span className="text-xs font-normal text-red-600">{formErors.phone}</span>
                            }
                        </div>
                        <div className='w-full'>
                            <Input
                                type='text'
                                name='address'
                                label='Address'
                                value={studentData.address}
                                onChange={handleOnChange}
                                placeholder='Mumbai 451235'
                                className='mb-0'

                            />
                            {
                                formErors.address && <span className="text-xs font-normal text-red-600">{formErors.address}</span>
                            }
                        </div>
                    </div>
                    <div className="py-1 w-full"></div>
                    <div className='mt-2 flex gap-2'>
                        <div className='w-full'>
                            <SelectInput
                                label='Gender'
                                className='mb-0'
                                onChange={(value) => {
                                    setStudentData((prev) => {
                                        return {
                                            ...prev,
                                            gender: value.toString()
                                        }
                                    })
                                }}
                                name={'gender'}
                                value={studentData.gender}
                                option={
                                    [{ label: "male", value: 'M' }, { label: "female", value: 'F' }]
                                }
                            />
                            {
                                formErors.gender && <span className="text-xs font-normal text-red-600">{formErors.gender}</span>
                            }
                        </div>
                        <div className='w-full'>
                            <SelectInput
                                className='mb-0'
                                label='Academic or Employment Status'
                                onChange={(value) => {
                                    setStudentData((prev) => {
                                        return {
                                            ...prev,
                                            employmentStatus: value.toString()
                                        }
                                    })
                                }}
                                name={'employmentStatus'}
                                value={studentData.employmentStatus}
                                option={[{ label: "working", value: 'W' }, { label: "student", value: 'S' }]}
                            />
                            {
                                formErors.employmentStatus && <span className="text-xs font-normal text-red-600">{formErors.employmentStatus}</span>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StudentEdit