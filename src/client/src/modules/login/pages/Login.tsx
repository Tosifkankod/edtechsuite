import Input from "../../../components/ui/Input"

const Login = () => {
    return (
        <div className="flex w-full h-screen justify-center items-center flex-col">
            <h1 className="mb-10  text-4xl text-gray-700"><span className="font-bold underline" >E</span>dTechSuite</h1>

            <div className="w-[25%] shadow-xl rounded-xl border border-gray-500 p-4 py-6">
                <p className="text-center text-xl font-medium">Login Credentials</p>
                <div className="mt-8">
                    <form action="">
                        <Input
                            type='text'
                            name='studentName'
                            label='Email Address'
                            placeholder='John Doe'
                            className='mb-0'
                            value=""
                            onChange={() => { }}
                        />
                        <br />
                        <Input
                            type='password'
                            name='studentName'
                            label='Password'
                            placeholder='D#74X1!!S@34F'
                            className='mb-0'
                            value=""
                            onChange={() => { }}
                        />
                        <br />
                        <button className="text-white w-full h-full p-2 text-lg bg-dark-angled rounded-md duration-150 hover:shadow-lg cursor-pointer shadow-gray-700 " >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login