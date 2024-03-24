import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetAllSubjectsQuery} from "../../redux/slices/subjectApiSlice.js";
import {useGetAllProgramsQuery} from "../../redux/slices/programApiSlice.js";
import {useGetExamQuery, useUpdateExamMutation} from "../../redux/slices/examApiSlice.js";
import academicYear from "../academicYear.jsx";
import {useGetAllClassLevelsQuery} from "../../redux/slices/classLevelSlice.js";
import {useGetAllAcademicYearsQuery} from "../../redux/slices/academicYearSlice.js";
import {useGetAllAcademicTermsQuery} from "../../redux/slices/academicTermSlice.js";

const TeacherManagingExams = () => {
    const [formData, setFormData] = useState({
        name:'',
        description: '',
        subject:'',
        program:'',
        passMark: 0,
        totalMark: 0,
        examType: '',
        examStatus: '',
        duration: "",
        examDate: "",
        classLevel:"",
        academicTerm:"",
        academicYear:"",
    })

    const [subjects, setSubjects] = useState([])
    const [programs, setPrograms] = useState([])
    const [classes, setClasses] = useState([])
    const [academicYears, setAcademicYears] = useState([])
    const [academicTerms, setAcademicTerms] = useState([])

    const {data:classLevelData, isLoading:classLevelLoading, isError:classLevelError, isSuccess:classLevelSuccess} = useGetAllClassLevelsQuery()

    useEffect(() => {
        if (classLevelSuccess) {
            setClasses(classLevelData.data)
            console.log(classes)
        }
    }, [classLevelData, classLevelSuccess])

    const {data:academicYearData, isLoading:academicYearLoading, isError:academicYearError, isSuccess:academicYearSuccess} = useGetAllAcademicYearsQuery()
    useEffect(() => {
        if (academicYearSuccess) {
            setAcademicYears(academicYearData.data)
            console.log(academicYears)
        }
    }, [academicYearData, academicYearSuccess]);

    const {data:academicTermData, isLoading:academicTermLoading, isError:academicTermError, isSuccess:academicTermSuccess} = useGetAllAcademicTermsQuery()
    useEffect(() => {
        if (academicTermSuccess) {
            setAcademicTerms(academicTermData.data)
            console.log(academicTerms)
        }
    }, [academicTermData, academicTermSuccess]);

    const {data: subjectsData, isLoading: subjectsLoading, isError: subjectsError, isSuccess: subjectsSuccess} = useGetAllSubjectsQuery()

    useEffect(() => {
        if (subjectsSuccess) {
            setSubjects(subjectsData.data)
            console.log(subjects)
        }
    }, [subjectsData, subjectsSuccess])
    const {data: programsData, isLoading: programsLoading, isError: programsError, isSuccess: programsSuccess} = useGetAllProgramsQuery()
    useEffect(() => {
        if (programsSuccess) {
            setPrograms(programsData.data)
            console.log(programs)
        }
    }, [programsData, programsSuccess])
    const examId = useParams().id;

    const {data: examData, isLoading, isError, isSuccess} = useGetExamQuery(examId);

    useEffect(() => {
        if (isSuccess) {
            setFormData(examData.data)
            console.log(formData)
        }
    }, [examData,isSuccess]);

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
        const day = String(dateObject.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const [updateExam, {isLoading: updateLoding}] = useUpdateExamMutation();

    /*const subject = subjects.find(sub => sub._id === exam.subject);
    const program = programs.find(prog => prog._id === exam.program);*/
   /* console.log(program)
    console.log(subject)*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        // handle exam update here using rtk
        try {
            console.log(examId)
            const res = await updateExam({id: examId, body: formData}).unwrap()
            const {message} = res
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
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Program Information
                                        </h2>
                                        <p className=" text-sm text-gray-600 mt-2">You need to add a good Informations
                                            for a good results.</p>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Exam
                                            Name</label>
                                        <div className="">
                                            <input
                                                value={formData?.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                type="text" id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Duration</label>
                                        <div className="">
                                            <input
                                                value={formData.duration}
                                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                                type="text"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Exam
                                            Type</label>
                                        <div className="">
                                            <input
                                                value={formData.examType}
                                                onChange={(e) => setFormData({...formData, examType: e.target.value})}
                                                type="text"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Status</label>
                                        <div className="">
                                            <input
                                                value={formData.examStatus}
                                                onChange={(e) => setFormData({...formData, examStatus: e.target.value})}
                                                type="text"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Duration</label>
                                        <div className="">
                                            <input
                                                value={formatDate(formData.examDate)}
                                                onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                                                type="date"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Pass
                                            Mark</label>
                                        <div className="">
                                            <input
                                                value={formData.passMark}
                                                onChange={(e) => setFormData({...formData, passMark: e.target.value})}
                                                type="text"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Total
                                            Mark</label>
                                        <div className="">
                                            <input
                                                value={formData.totalMark}
                                                onChange={(e) => setFormData({...formData, totalMark: e.target.value})}
                                                type="text"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Academic Term</label>
                                        <div className="">
                                            <select
                                                value={formData.academicTerm}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    academicTerm: e.target.value
                                                })}
                                                id="academic-term"
                                                name="academic-term"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your academic term</option>
                                                {academicTerms.map((academicterm, index) => (
                                                    <option key={index}
                                                            value={academicterm._id}>{academicterm.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Academic Year</label>
                                        <div className="">
                                            <select
                                                value={formData.academicYear}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    academicYear: e.target.value
                                                })}
                                                id="academic-year"
                                                name="academic-year"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your academic year</option>
                                                {academicYears.map((academicyear, index) => (
                                                    <option key={index}
                                                            value={academicyear._id}>{academicyear.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Class Level</label>
                                        <div className="">
                                            <select
                                                value={formData.classLevel}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    classLevel: e.target.value
                                                })}
                                                id="class-level"
                                                name="class-level"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your class level</option>
                                                {classes.map((classlevel, index) => (
                                                    <option key={index}
                                                            value={classlevel._id}>{classlevel.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
                                        <div className="">
                                            <select
                                                value={formData.subject}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    subject: e.target.value
                                                })}
                                                id="subject"
                                                name="subject"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your subject</option>
                                                {subjects.map((subject, index) => (
                                                    <option key={index}
                                                            value={subject._id}>{subject.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-6">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Program</label>
                                        <div className="">
                                            <select
                                                value={formData.program}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    program: e.target.value
                                                })}
                                                id="program"
                                                name="program"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>select your program</option>
                                                {programs.map((program, index) => (
                                                    <option key={index}
                                                            value={program._id}>{program.name}</option>
                                                ))}
                                            </select>
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
                                            your Program.</p>
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

export default TeacherManagingExams;