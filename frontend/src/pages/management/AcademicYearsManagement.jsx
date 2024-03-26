import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    useAddStudentToAcademicYearMutation,
    useDeleteAcademicYearMutation,
    useGetAcademicYearQuery,
    useUpdateAcademicYearMutation
} from "../../redux/slices/academicYearSlice.js";
import {toast} from "react-toastify";
import {useGetAllStudentsQuery} from "../../redux/slices/studentApiSlice.js";

const AcademicYearsManagement = () => {
    const [formData, setFormData] = useState({
        name: '',
        fromYear: '',
        toYear: ''
    })

    const [addStudentFormData, setAddStudentFormData] = useState({
        studentID: '',
        academicYearID: ''
    })
    const [students, setStudents] = useState([])


    const academicYearId = useParams().id
    const {data: studentsData, isLoading: isStudentsLoading, isSuccess: isStudentsSuccess, isError: isStudentsError} = useGetAllStudentsQuery()

    useEffect(() => {
        if (isStudentsSuccess) {
            setStudents(studentsData.data)
        }
    }, [studentsData, isStudentsSuccess]);

    const {data: academicYearData, isLoading, isSuccess, isError} = useGetAcademicYearQuery(academicYearId)

    useEffect(() => {
        if (isSuccess) {
            setFormData(academicYearData.data)
        }
    }, [academicYearData, isSuccess]);
    console.log(academicYearId)

    const [updateAcademicYear, {data, isLoading: isUpdating, isSuccess: isUpdated, isError: updateError}] = useUpdateAcademicYearMutation()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateAcademicYear({id: academicYearId, data: formData}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(message)
        }catch (e) {
            console.log(e)
        }
    }

    const [deleteAcademicYear, {data: deleteData, isLoading: isDeleting, isSuccess: isDeleted, isError: deleteError}] = useDeleteAcademicYearMutation()
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
        const day = String(dateObject.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleDeleteAcademicYear = async(e) => {
        e.preventDefault();
        try {
            const res = await deleteAcademicYear({id: academicYearId}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(message)
        }catch (e) {
            console.log(e)
        }
    }

    const [addStudentToAcademicYear, {data: addStudentData, isLoading: isAddingStudent, isSuccess: isAddedStudent, isError: addStudentError}] = useAddStudentToAcademicYearMutation()
    const handleAddStudentSubmit = async (e) => {
        e.preventDefault();
        console.log(addStudentFormData)
        try {
            const res = await addStudentToAcademicYear({studentID: addStudentFormData.studentID, academicYearID: academicYearId}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(message)
        }catch (e) {
            console.log(e)
        }

    }
    return (
        <>
            {/* edit modal */}
            <div
                className="justify-center items-center flex pt-20 overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none">
                <div className="sm:w-full w-max my-6 mx-auto max-w-3xl">

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-2">
                                <div className={"flex justify-between items-center"}>
                                    <div>
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Academic Year
                                            Information
                                        </h2>
                                        <p className=" text-sm text-gray-600 mt-2">You need to add a good Informations
                                            for a good results.</p>
                                    </div>
                                    <button onClick={handleDeleteAcademicYear}
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

                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">From</label>
                                        <div className="">
                                            <input
                                                value={formatDate(formData.fromYear)}
                                                onChange={(e) => setFormData({...formData, fromYear: e.target.value})}
                                                type="date"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>

                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">To</label>
                                        <div className="">
                                            <input
                                                value={formatDate(formData.toYear)}
                                                onChange={(e) => setFormData({...formData, toYear: e.target.value})}
                                                type="date"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-x-6">

                            <button type="submit"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                            </button>
                        </div>

                    </form>

                </div>
            </div>
            <div
                className="justify-center items-center flex pt-4 overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none">
                <div className="sm:w-full w-max my-6 mx-auto max-w-3xl">

                    <form onSubmit={handleAddStudentSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-2">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Add subject to a
                                    program</h2>
                                <p className=" text-sm text-gray-600">You need to add a good Informations for a good
                                    results.</p>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Subjects</label>
                                        <div className="">
                                            <select
                                                value={addStudentFormData.studentID}
                                                onChange={(e) => setAddStudentFormData({...addStudentFormData, studentID: e.target.value})}
                                                id="subject"
                                                name="subject"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your subject</option>
                                                {students.map((student, index) => (
                                                    <option key={index} value={student._id}>{student.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3 sm:col-start-6 self-end">
                                        <div className={""}>
                                            <button type="submit"
                                                    className="rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default AcademicYearsManagement;