import React, {useState} from 'react';
import {useParams} from "react-router-dom";

const YearGroupsManagement = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        academicYear: "",
    })

    const groupId = useParams().id;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted")
    }
    return (
        <>
            {/* edit modal */}
            <div className="justify-center items-center flex pt-20 overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none">
                <div className="sm:w-full w-max my-6 mx-auto max-w-3xl">

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-2">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Group Information</h2>
                                <p className=" text-sm text-gray-600">You need to add a good Informations for a good results.</p>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-6">

                                    </div>

                                    <div className="sm:col-span-3">

                                    </div>

                                    <div className="sm:col-span-3">

                                    </div>



                                    <div className="sm:col-span-6">

                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">

                                    </div>

                                    <div className="sm:col-span-2">

                                    </div>

                                    <div className="sm:col-span-2">

                                    </div>

                                    <div className="col-span-full">

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

export default YearGroupsManagement;