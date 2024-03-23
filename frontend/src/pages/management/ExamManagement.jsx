import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetExamQuery} from "../../redux/slices/examApiSlice.js";
import {useGetAllSubjectsQuery} from "../../redux/slices/subjectApiSlice.js";
import {useGetAllProgramsQuery} from "../../redux/slices/programApiSlice.js";

const ExamManagement = () => {
    const examId = useParams().id;

    const [exam, setExam] = useState({});
    const [subjects, setSubjects] = useState([])
    const [programs, setPrograms] = useState([])

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

    const {data: examData, isLoading, isError, isSuccess} = useGetExamQuery(examId);

    useEffect(() => {
        if (isSuccess) {
            setExam(examData.data)
            console.log(exam)
        }
    }, [examData,isSuccess]);

    const subject = subjects.find(sub => sub._id === exam.subject);
    const program = programs.find(prog => prog._id === exam.program);
    console.log(program)
    console.log(subject)
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
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
                                <p className=" text-sm text-gray-600">You need to add a good Informations for a good results.</p>
                                <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-6 border-1 rounded bg-white">
                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold  w-[140px]"}>Exam Name:</span>
                                        <span className={"p-2"}>{exam.name}</span>

                                    </div>

                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>Exam Subject:</span>
                                        <span className={"p-2"}>{subject?.name}</span>
                                    </div>

                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>Exam program:</span>
                                        <span className={"p-2"}>{program?.name}</span>
                                    </div>


                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>Pass Mark:</span>
                                        <span className={"p-2"}>{exam?.passMark}</span>

                                    </div>
                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>Total Mark:</span>
                                        <span className={"p-2"}>{exam?.totalMark}</span>

                                    </div>

                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>Duration:</span>
                                        <span className={"p-2"}>{exam?.duration}</span>

                                    </div>

                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>Exam Date:</span>
                                        <span className={"p-2"}>{exam?.examDate}</span>

                                    </div>

                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>Exam Time:</span>
                                        <span className={"p-2"}>{exam?.examTime}</span>

                                    </div>

                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>Status:</span>
                                        <span className={"p-2"}>{exam?.examStatus}</span>

                                    </div>

                                    <div className="sm:col-span-6 border-b-1 flex justify-start items-center">
                                        <span className={"border-r-1 p-2 font-semibold w-[140px]"}>N. Questions:</span>
                                        <span className={"p-2"}>{exam?.questions.length}</span>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-x-6">
                            <button type="submit"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default ExamManagement;