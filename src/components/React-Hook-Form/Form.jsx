import React from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form';

const Forms = () => {
    const schema = yup.object().shape({
        fullName: yup.string().required(),
        email: yup.string().email().required(),
        age: yup.number().positive().integer().min(18).required("Age is required"),
        password: yup.string().min(4).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "passwords don't match").required()
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)

    });

    const onSubmit = data => console.log(data);
    return (
        <div className="flex flex-col items-center justify-center h-screen dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">

                <form className='flex flex-col w-full' onSubmit={ handleSubmit(onSubmit) }>

                    <input className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" placeholder='Full Name...'{ ...register("fullName") } />
                    { errors.fullName && <p className=' text-red-500' > { errors?.fullName.message }</p> }
                    <input className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" placeholder='Email...'{ ...register("email") } />
                    { errors.email && <p className=' text-red-500' > { errors?.email.message }</p> }
                    <input className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="number" placeholder='Age...'{ ...register("age") } />
                    { errors.age && <p className=' text-red-500' > { errors?.age.message }</p> }
                    <input className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" placeholder='Password...'{ ...register("password") } />
                    { errors.password && <p className=' text-red-500' > { errors?.password.message }</p> }
                    <input className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" placeholder='Confirm Password ...'{ ...register("confirmPassword") } />
                    { errors.confirmPassword && <p className=' text-red-500' > { errors?.confirmPassword.message }</p> }
                    <input className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit" />

                </form>
            </div>
        </div>
    )
}

export default Forms