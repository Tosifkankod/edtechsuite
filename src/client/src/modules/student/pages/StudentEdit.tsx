import { Save } from 'lucide-react'
import Input from '../../../components/ui/Input'
import SelectInput from '../../../components/ui/SelectInput'
import { useState } from 'react';

const StudentEdit = () => {
    const [status, setStatus] = useState<string | number>("");


    return (
        <div className="h-full py-4 scroll-smooth">
            <div className="mb-4">
                <h1 className="text-3xl font-medium">Add Student</h1>
                <p className="text-lg text-gray-600">fill all required information</p>
            </div>
            <form  >
                <div className="px-4 flex justify-end">
                    <button className="bg-dark-angled gap-2 rounded-md py-2 flex items-center justify-center text-white px-3 text-sm ">
                        <Save className="" size={17} />
                        Save Changes
                    </button>
                </div>
                <div className="px-4 py-6 shadow-sm my-2 bg-white rounded-md w-full">
                    <p className="text-lg mb-4 font-semibold">Student Information</p>
                    <div className="mt-2 flex gap-2">
                        <Input
                            type='text'
                            name='name'
                            label='Full Name'
                            value={''}
                            onChange={() => { }}
                            placeholder='John Doe'

                        />
                        <Input
                            type='email'
                            name='email'
                            label='Email address'
                            value={''}
                            onChange={() => { }}
                            placeholder='johndoe@gmail.com'

                        />
                    </div>
                    <div className="mt-2 flex gap-2">
                        <Input
                            type='text'
                            name='name'
                            label='Phone Number'
                            value={''}
                            onChange={() => { }}
                            placeholder='00000 00000'
                        />

                        <Input
                            type='text'
                            name='address'
                            label='Address'
                            value={''}
                            onChange={() => { }}
                            placeholder='Mumbai 451235'

                        />
                    </div>
                    <div className='mt-2'>
                        <SelectInput label='Academic or Employment Status' onChange={(value) => { setStatus(value) }} name={'status'} value={status} option={[{ label: "working", value: 'WRK' }, { label: "student", value: 'STD' }]} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StudentEdit