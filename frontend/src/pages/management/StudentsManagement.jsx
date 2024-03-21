import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetStudentByAdminQuery} from "../../redux/slices/studentApiSlice.js";
import {useGetAllProgramsQuery} from "../../redux/slices/programApiSlice.js";
import {useGetAllClassLevelsQuery} from "../../redux/slices/classLevelSlice.js";
import {useGetAllAcademicYearsQuery} from "../../redux/slices/academicYearSlice.js";

const StudentsManagement = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentId: '',
        isWithdrawn: false,
        isSuspended: false,
        classLevels: '',
        program: '',
        academicYear: '',
        isGraduated: false,
    });
    const [programs, setPrograms] = useState([]);
    const [classLevels, setClassLevels] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);

    const {data: programData, isLoading: programLoading, isError: programError, isSuccess: programSuccess} = useGetAllProgramsQuery();
    useEffect(() => {
        if (programSuccess) {
            setPrograms(programData.data)
        }
    }, [programData, programSuccess]);

    const { data: classLevelData, isLoading: classLevelLoading, isError: classLevelError, isSuccess: classLevelSuccess } = useGetAllClassLevelsQuery();
    useEffect(() => {
        if (classLevelSuccess) {
            setClassLevels(classLevelData.data)
        }
    }, [classLevelData, classLevelSuccess]);

    const { data: academicYearData, isLoading: academicYearLoading, isError: academicYearError, isSuccess: academicYearSuccess } = useGetAllAcademicYearsQuery();

    useEffect(() => {
        if (academicYearSuccess) {
            setAcademicYears(academicYearData.data)
        }
    }, [academicYearData, academicYearSuccess]);

    const studentId = useParams().id;

    const {data: student, isLoading, isError, isSuccess} = useGetStudentByAdminQuery(studentId);

    useEffect(() => {
        if (isSuccess){
            setFormData(student.data)
        }
        console.log(formData)
    }, [student, isSuccess]);

    const handleRadioChange = (e) => {
        setFormData({ ...formData, isWitdrawn: e.target.value === 'true' });
    }

    const handleSuspendedRadioChange = (e) => {
        setFormData({ ...formData, isSuspended: e.target.value === 'true'});
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        console.log(formData)
        console.log("submit")
    }

    const handleDeleteStudent = (e) => {
        e.preventDefault()
        console.log("delete")
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
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Student <span
                                            className={"p-2 border-1 bg-indigo-600 text-white text-sm rounded"}>{formData?.studentId}</span> Information
                                        </h2>
                                        <p className=" text-sm text-gray-600 mt-2">You need to add a good Informations
                                            for a good results.</p>
                                    </div>
                                    <button onClick={handleDeleteStudent}
                                            className="text-sm font-semibold leading-6 text-white border-1 p-2 rounded bg-red-500">Delete
                                    </button>
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Teacher
                                            Name</label>
                                        <div className="">
                                            <input
                                                value={formData?.name}
                                                disabled={true}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                type="text" id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>

                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                        <div className="">
                                            <input
                                                value={formData.email}
                                                disabled={true}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                type="email"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>

                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Graduated</label>
                                        <div className="">
                                            <input
                                                value={formData.isGraduated}
                                                disabled={true}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                type="email"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3 sm:col-start-1">
                                        <div className="">
                                            <h4 className="text-xl lg:text-2xl font-semibold">
                                                Withdrawn
                                            </h4>

                                            <div>
                                                <label
                                                    className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                    <input type="radio" name="isWithdrawn"
                                                           value={"true"}
                                                           checked={formData.isWithdrawn === true}
                                                           onChange={handleRadioChange}

                                                    />
                                                    <i className="pl-2">True</i>
                                                </label>

                                                <label
                                                    className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                    <input type="radio" name="isWithdrawn"
                                                           value={"false"}
                                                           checked={formData.isWithdrawn === false}
                                                           onChange={handleRadioChange}
                                                    />
                                                    <i className="pl-2">False</i>
                                                </label>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="sm:col-span-3 sm:col-start-4">
                                        <div className="">
                                            <h4 className="text-xl lg:text-2xl font-semibold">
                                                Suspended
                                            </h4>

                                            <div>
                                                <label
                                                    className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                    <input type="radio" name="isSuspended"
                                                           value={"true"}
                                                           checked={formData.isSuspended === true}
                                                           onChange={handleSuspendedRadioChange}
                                                    />
                                                    <i className="pl-2">True</i>
                                                </label>

                                                <label
                                                    className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                    <input type="radio" name="isSuspended"
                                                           value={"false"}
                                                           checked={formData.isSuspended === false}
                                                           onChange={handleSuspendedRadioChange}
                                                    />
                                                    <i className="pl-2">False</i>
                                                </label>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Program</label>
                                        <div className="">
                                            <select
                                                value={formData.program}
                                                onChange={(e) => setFormData({...formData, program: e.target.value})}
                                                id="program"
                                                name="program"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your program</option>
                                                {programs.map((program, index) => (
                                                    <option key={index} value={program._id}>{program.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Class
                                            Level</label>
                                        <div className="">
                                            <select
                                                value={formData.classLevels}
                                                onChange={(e) => setFormData({...formData, classLevels: e.target.value})}
                                                id="classLevel"
                                                name="classLevel"
                                                autoComplete="country-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select The class Level</option>
                                                {classLevels.map((classLevel, index) => (
                                                    <option key={index}
                                                            value={classLevel._id}>{classLevel.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/*{errors.program && <span className="text-red-600 text-xs">Program is Required</span>}*/}
                                    </div>
                                    <div className="sm:col-span-6 sm:col-start-1 sm:col-end-6">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Academic
                                            Year</label>
                                        <div className="">
                                            <select
                                                value={formData.academicYear}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    academicYear: e.target.value
                                                })}
                                                id="academicYear"
                                                name="academicYear"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select The academic year</option>
                                                {academicYears.map((academicYear, index) => (
                                                    <option key={index}
                                                            value={academicYear._id}>{academicYear.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/*{errors.program && <span className="text-red-600 text-xs">Program is Required</span>}*/}
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

export default StudentsManagement;