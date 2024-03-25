import React, {useEffect, useState} from 'react';
import {Header} from "../components/index.jsx";
import {useGetAllProgramsQuery} from "../redux/slices/programApiSlice.js";
import {useGetAllAcademicTermsQuery} from "../redux/slices/academicTermSlice.js";
import {useGetAllAcademicYearsQuery} from "../redux/slices/academicYearSlice.js";
import {useGetAllSubjectsQuery} from "../redux/slices/subjectApiSlice.js";
const TeacherDataEntry = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        program: "",
        academicTerm: "",
        classLevel: "",
        academicYear: "",
        passMark: "",
        duration: "",
        examDate: "",
        examTime: "",
        examType: "",
        subject: "",
    });

    const [questionFormData, setQuestionFormData] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
    });

    const [examId, setExamId] = useState("")


    const {data: classes ,isLoading: isLoadingPrograms, isError: isErrorPrograms, isSuccess: isSuccessPrograms} = useGetAllClassLevelsQuery();
    const {data: programs ,isLoading: isLoadingClasses, isError: isErrorClasses, isSuccess: isSuccessClasses} = useGetAllProgramsQuery();
    const {data: subjects ,isLoading: isLoadingSubjects, isError: isErrorSubjects, isSuccess: isSuccessSubjects} = useGetAllSubjectsQuery();

    const {data: academicTerms ,isLoading: isLoadingAcademicTerms, isError: isErrorAcademicTerms, isSuccess: isSuccessAcademicTerms} = useGetAllAcademicTermsQuery();
    const {data: academicYears ,isLoading: isLoadingAcademicYears, isError: isErrorAcademicYears, isSuccess: isSuccessAcademicYears} = useGetAllAcademicYearsQuery();
    const {data: exams, isLoading: isLoadingExams, isSuccess: isSuccessExams, isError: isExamsError} = useGetAllExamsQuery()


    const [addExam, {isLoading, isSuccess, isError}] = useCreateExamMutation();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const result = await addExam(formData).unwrap();
            const {message} = result;
            console.log(message);
        }catch (e) {
            console.log(e)
        }
    }

    const [addQuestion, {isLoading: questionIsLoading, isSuccess: questionIsSuccess, isError: questionIsError}] = useAddQuestionMutation();

    const handleQuestionSubmit = async(e) => {
        e.preventDefault();
        console.log(questionFormData);
        try {
            const res = await addQuestion({data:questionFormData, id:examId}).unwrap();
            const {message} = res;
            console.log(message);
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Exam"}/>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectName" className={"block ml-2"}>Name</label>
                            <input type="text" id="examName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={formData.name}
                                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="passMark" className={"block ml-2"}>Pass Mark</label>
                            <input id="passMark" type="number" placeholder="Pass Mark"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={formData.passMark}
                                   onChange={(e) => setFormData({...formData, passMark: e.target.value})}
                            />

                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="totalMark" className={"block ml-2"}>Total Mark</label>
                            <input id="totalMarkMark" type="number" placeholder="Total Mark"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={formData.totalMark}
                                   onChange={(e) => setFormData({...formData, totalMark: e.target.value})}
                            />
                        </div>

                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="examType" className={"block ml-2"}>Exam Type</label>
                            <input id="examType" type="text" placeholder="Exam Type"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={formData.examType}
                                   onChange={(e) => setFormData({...formData, examType: e.target.value})}
                            />

                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="examTime" className={"block ml-2"}>Exam Time</label>
                            <input id="examTime" type="text" placeholder="examTime"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={formData.examTime}
                                   onChange={(e) => setFormData({...formData, examTime: e.target.value})}
                            />
                        </div>

                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="duration" className={"block ml-2"}>Duration</label>
                            <input id="duration" type="text" placeholder="Duration"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={formData.duration}
                                   onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            />

                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="examDate" className={"block ml-2"}>Exam Date</label>
                            <input id="examDate" type="date" placeholder="Date"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={formData.examDate}
                                   onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                            />
                        </div>

                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="academicTermSelect" className={"block ml-2"}>Academic Term</label>
                            <select id="academicTermSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={formData.academicTerm}
                                    onChange={(e) => setFormData({...formData, academicTerm: e.target.value})}
                            >
                                <option value={""}>Select an academic term</option>
                                {academicTerms?.data?.map((term, index) => (
                                    <option key={index} value={term._id}>{term.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="programSelect" className={"block ml-2"}>Programs</label>
                            <select id="programSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={formData.program}
                                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                            >
                                <option value={""}>Select a program</option>
                                {programs?.data?.map((program, index) => (
                                    <option key={index} value={program._id}>{program.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="academicYearSelect" className={"block ml-2"}>Academic Year</label>
                            <select id="academicYearSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={formData.academicYear}
                                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                            >
                                <option value={""}>Select an academic term</option>
                                {academicYears?.data?.map((year, index) => (
                                    <option key={index} value={year._id}>{year.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectSelect" className={"block ml-2"}>Subjects</label>
                            <select id="subjectSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            >
                                <option value={""}>Select a subject</option>
                                {subjects?.data?.map((subject, index) => (
                                    <option key={index} value={subject._id}>{subject.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="classLevelSelect" className={"block ml-2"}>Class level</label>
                            <select id="classLevelSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={formData.classLevel}
                                    onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
                            >
                                <option value={""}>Select a Class level</option>
                                {classes?.data?.map((classe, index) => (
                                    <option key={index} value={classe._id}>{classe.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className={"flex-1"}>
                        {/*add text area and style it  */}
                        <label htmlFor="examDescription" className={"block ml-2"}>Description</label>
                        <textarea id="examDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}
                                  value={formData.description}
                                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Exam
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Exam"}/>
                <form
                    onSubmit={handleQuestionSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectName" className={"block ml-2"}>Question</label>
                            <input type="text" id="examName"
                                   placeholder={"Question"}
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={questionFormData.question}
                                   onChange={(e) => setQuestionFormData({...questionFormData, question: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="optionA" className={"block ml-2"}>Option A</label>
                            <input id="optionA"
                                   type="text"
                                   placeholder="Option A"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={questionFormData.optionA}
                                   onChange={(e) => setQuestionFormData({...questionFormData, optionA: e.target.value})}
                            />

                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="totalMark" className={"block ml-2"}>Option B</label>
                            <input id="totalMarkMark" type="text" placeholder="Option B"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={questionFormData.optionB}
                                   onChange={(e) => setQuestionFormData({...questionFormData, optionB: e.target.value})}
                            />
                        </div>

                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="optionC" className={"block ml-2"}>Option C</label>
                            <input id="totalMarkMark" type="text" placeholder="Option C"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={questionFormData.optionC}
                                   onChange={(e) => setQuestionFormData({...questionFormData, optionC: e.target.value})}
                            />
                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="optionD" className={"block ml-2"}>Option D</label>
                            <input id="optionD" type="text" placeholder="Option D"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={questionFormData.optionD}
                                   onChange={(e) => setQuestionFormData({...questionFormData, optionD: e.target.value})}
                            />
                        </div>

                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="answer" className={"block ml-2"}>Answer</label>
                            <select id="answer"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={questionFormData.correctAnswer}
                                    onChange={(e) => setQuestionFormData({...questionFormData, correctAnswer: e.target.value})}
                            >
                                <option value={""}>Select an academic term</option>
                                <option value={"optionA"}>Option A</option>
                                <option value={"optionB"}>Option B</option>
                                <option value={"optionC"}>Option C</option>
                                <option value={"optionD"}>Option D</option>

                            </select>
                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="academicYearSelect" className={"block ml-2"}>Exam</label>
                            <select id="academicYearSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={examId}
                                    onChange={(e) => setExamId(e.target.value)}
                            >
                                <option value={""}>Select an exam</option>
                                {exams?.data?.map((exam, index) => (
                                    <option key={index} value={exam._id}>{exam.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Exam
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
};
import {useGetAllClassLevelsQuery} from "../redux/slices/classLevelSlice.js";

import {useCreateExamMutation, useGetAllExamsQuery} from "../redux/slices/examApiSlice.js";
import {useAddQuestionMutation} from "../redux/slices/questionApiSlice.js";

export default TeacherDataEntry;