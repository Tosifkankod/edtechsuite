import { Save } from 'lucide-react'
import Input from '../../../components/ui/Input'
import SelectInput from '../../../components/ui/SelectInput'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useGetSingleTrainer, useSaveTrainer, useUpdateTrainer } from '../hooks/queryHooks';
import { AxiosError } from 'axios';
import { useToast } from '../../../components/ui/Alert';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TrainerEdit = () => {
  const [trainerData, setTrainerData] = useState({
    trainerName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    joiningDate: ""
  })
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState<typeof trainerData | null>(null);
  const { trainerId } = useParams();
  const { data, isLoading } = useGetSingleTrainer(String(trainerId));
  const isEdit = Boolean(trainerId);
  const [formErors, setFormErrors] = useState<Record<string, string>>({});
  const saveMutation = useSaveTrainer();
  const updateMutation = useUpdateTrainer(String(trainerId));
  const { toast } = useToast();

  useEffect(() => {
    if (isEdit && data) {
      const formattedData = {
        trainerName: data.trainerName ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        address: data.address ?? '',
        gender: data.gender ?? '',
        joiningDate: data.joiningDate ?? new Date(data.joiningDate)
      }
      console.log(formattedData)
      setOriginalData(formattedData);
      setTrainerData(formattedData)
    }
  }, [isEdit, data])

  const getUpdatedFields = () => {
    if (!originalData) return trainerData;
    const updated: Partial<typeof trainerData> = {};
    Object.keys(trainerData).forEach((key) => {
      const k = key as keyof typeof trainerData;
      if (trainerData[k] !== originalData[k]) {
        updated[k] = trainerData[k];
      }
    })
    return updated;
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});

    const updatedFields = isEdit ? getUpdatedFields() : {};
    if (Object.keys(updatedFields).length == 0 && updatedFields.constructor === Object && isEdit) {
      toast('Nothing Changed', 'info')
      return;
    }
    setFormErrors({});

    if (isEdit) {
      try {
        await updateMutation.mutateAsync(trainerData)
        navigate('/trainer')
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
    } else {
      try {
        await saveMutation.mutateAsync(trainerData)
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
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrainerData((prev) => {
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

  return (
    <div className="h-full py-4 scroll-smooth">
      <div className="mb-4">
        <h1 className="text-3xl font-medium">Add Trainer</h1>
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
          <p className="text-lg mb-4 font-semibold">Trainer Information</p>
          <div className="mt-2 flex gap-2">
            <div className='w-full'>
              <Input
                type='text'
                name='trainerName'
                label='Full Name'
                value={trainerData.trainerName}
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
                value={trainerData.email}
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
                value={trainerData.phone}
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
                value={trainerData.address}
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
                  setTrainerData((prev) => {
                    return {
                      ...prev,
                      gender: value.toString()
                    }
                  })
                }}
                name={'gender'}
                value={trainerData.gender}
                option={
                  [{ label: "male", value: 'M' }, { label: "female", value: 'F' }]
                }
              />
              {
                formErors.gender && <span className="text-xs font-normal text-red-600">{formErors.gender}</span>
              }
            </div>

            <div className='w-full'>
              <label
                className="text-sm font-medium mb-1 block"
              >
                Joining date
              </label>
              <input
                type="date"
                name='joiningDate'
                value={trainerData.joiningDate}
                onChange={(e) => {
                  setTrainerData((prev) => {
                    return { ...prev, joiningDate: e.target.value }
                  })
                }}
                className='w-full bg-neutral-secondary-medium border border-gray-200 bg-gray-50 text-heading rounded-md focus:ring-brand focus:border-brand block text-sm px-3 py-2 mb-0  placeholder:text-body' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TrainerEdit