import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    useDeleteClassLevelMutation,
    useGetClassLevelQuery,
    useUpdateClassLevelMutation
} from "../../redux/slices/classLevelSlice.js";
import {toast} from "react-toastify";

const ClassLevelsManagement = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })

    const classLevelId = useParams().id;

    const {data: classLevel, isLoading, isSuccess, isError} = useGetClassLevelQuery(classLevelId)

    useEffect(() => {
        if (isSuccess) {
            setFormData(classLevel.data)
        }
    }, [classLevel, isSuccess]);

    const [updateClassLevel, {data, isLoading: isUpdating, isSuccess: isUpdated, isError: updateError}] = useUpdateClassLevelMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateClassLevel({id: classLevelId, data: formData}).unwrap();
            const {message} = res
            toast.success(message)
            console.log(message)
        }catch (e) {
            console.log(e)
        }
    }

    const [deleteClassLevel, {data: deleteData, isLoading: isDeleting, isSuccess: isDeleted, isError: deleteError}] = useDeleteClassLevelMutation();

    const handleDeleteClass = async (e) => {
        e.preventDefault();
        try {
            const res = await deleteClassLevel({id: classLevelId}).unwrap();
            const {message} = res
            console.log(message)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            {/* edit modal */}
            <div className="justify-center items-center flex pt-20 overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none">
                <div className="sm:w-full w-max my-6 mx-auto max-w-3xl">

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-2">
                                <div className={"flex justify-between items-center"}>
                                    <div>
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Class Level
                                            Information
                                        </h2>
                                        <p className=" text-sm text-gray-600 mt-2">You need to add a good Informations
                                            for a good results.</p>
                                    </div>
                                    <button onClick={handleDeleteClass}
                                            className="text-sm font-semibold leading-6 text-white border-1 p-2 rounded bg-red-500">Delete
                                    </button>
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Name</label>
                                        <div className="">
                                            <input
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                type="text" id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>


                                    <div className="col-span-full">
                                        <label htmlFor="about"
                                               className="block text-sm font-medium leading-6 text-gray-900">About</label>
                                        <div className="">
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    description: e.target.value
                                                })}
                                                id="about" name="about" rows="2"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"></textarea>
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-gray-600">Update a few things about
                                            The subject.
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end w-[93%]">
                            <button type="submit"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default ClassLevelsManagement;