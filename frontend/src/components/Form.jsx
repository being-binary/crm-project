import React from 'react';
import { useForm } from 'react-hook-form';
import { FaFileUpload } from "react-icons/fa";
import axiosInstance from '../api/axiosInstace';

const Form = ({ handleFileChange }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const formData = {
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        salary: '',
        startData: ''
    }
    const handleChange = (e) => {
        formData[e.target.name] = e.target.value
        console.log(formData)
    }

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        try {
            const response = await axiosInstance.post('/employee/create', data).then((res) => {
                console.log(`${res}`)
                alert(res.data.message);
            }).catch((err) => {
                console.log(`${err.data.error}`);
                alert(err.response.data.message);
            })
        } catch (error) {
            console.log(error)
            alert(
                error.response?.data?.message 
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <legend className="text-2xl font-bold mb-6 text-center text-gray-700">
                    Add Employee Details
                </legend>

                {/* Full Name */}
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Full Name is required" })}
                        className="w-full px-4 py-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format"
                                }
                            })}
                            className="w-full px-4 py-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Phone must be 10 digits"
                                }
                            })}
                            className="w-full px-4 py-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                </div>

                {/* Department and Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="department">Department</label>
                        <input
                            type="text"
                            id="department"
                            {...register("department")}
                            className="w-full px-4 py-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="position">Position</label>
                        <input
                            type="text"
                            id="position"
                            {...register("position")}
                            className="w-full px-4 py-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Salary */}
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="salary">Salary</label>
                    <input
                        type="number"
                        id="salary"
                        {...register("salary", { valueAsNumber: true })}
                        className="w-full px-4 py-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />
                </div>

                {/* Start Date */}
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        {...register("startDate")}
                        className="w-full px-4 py-2 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />
                </div>

                {/* File Upload */}
                <div className="mb-6">
                    <p className="block text-gray-600 mb-1">Upload Documents</p>
                    <label htmlFor="employeeFiles" className='flex flex-row items-center gap-2 cursor-pointer'>
                        <FaFileUpload className='text-4xl mt-3' />
                        <p className='text-lg mt-2 hover:text-blue-800'>Add Documents</p>
                    </label>
                    <input
                        type="file"
                        id="employeeFiles"
                        name="employeeFiles"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/* Submit */}
                <div className="text-right mt-6 pt-3 border-t">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
                        Submit
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default Form;
