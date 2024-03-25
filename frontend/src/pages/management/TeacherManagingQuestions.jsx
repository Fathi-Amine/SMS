import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetAllClassLevelsQuery} from "../../redux/slices/classLevelSlice.js";
import {useGetAllAcademicYearsQuery} from "../../redux/slices/academicYearSlice.js";
import {useGetAllAcademicTermsQuery} from "../../redux/slices/academicTermSlice.js";
import {useGetAllSubjectsQuery} from "../../redux/slices/subjectApiSlice.js";
import {useGetAllProgramsQuery} from "../../redux/slices/programApiSlice.js";
import {useGetAllExamsQuery, useGetExamQuery, useUpdateExamMutation} from "../../redux/slices/examApiSlice.js";
import {useGetQuestionQuery, useUpdateQuestionMutation} from "../../redux/slices/questionApiSlice.js";

const TeacherManagingQuestions = () => {
    const [formData, setFormData] = useState({
        question:"",
        optionA:"",
        optionB:"",
        optionC:"",
        optionD:"",
        correctAnswer:"",
    })

    const questionId = useParams().id;

    const {data: questionData, isLoading: questionLoading, isError: questionError, isSuccess: questionSuccess} = useGetQuestionQuery(questionId);

    const [updateQuestion, {data: updateData, isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess}] = useUpdateQuestionMutation();

    useEffect(() => {
        if (questionSuccess) {
            setFormData(questionData.data)
            console.log(formData)
        }
    }, [questionData, questionSuccess])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await updateQuestion({id: questionId, data: formData}).unwrap()
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
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Question Information
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
                                                value={formData?.question}
                                                onChange={(e) => setFormData({...formData, question: e.target.value})}
                                                type="text" id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Option A</label>
                                        <div className="">
                                            <input
                                                value={formData?.optionA}
                                                onChange={(e) => setFormData({...formData, optionA: e.target.value})}
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
                                                value={formData?.optionB}
                                                onChange={(e) => setFormData({...formData, optionB: e.target.value})}
                                                type="text"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Option C</label>
                                        <div className="">
                                            <input
                                                value={formData?.optionC}
                                                onChange={(e) => setFormData({...formData, optionC: e.target.value})}
                                                type="text"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Option D</label>
                                        <div className="">
                                            <input
                                                value={formData?.optionD}
                                                onChange={(e) => setFormData({...formData, optionD: e.target.value})}
                                                type="text"
                                                min="0"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900">Answer</label>
                                        <div className="">
                                            <select
                                                value={formData?.correctAnswer}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    correctAnswer: e.target.value
                                                })}
                                                id="academic-term"
                                                name="academic-term"
                                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option value={""}>Update the answer</option>
                                                <option value={"optionA"}>Option A</option>
                                                <option value={"optionB"}>Option B</option>
                                                <option value={"optionC"}>Option C</option>
                                                <option value={"optionD"}>Option D</option>

                                            </select>
                                        </div>

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

export default TeacherManagingQuestions;