import {Header} from "../components/index.jsx";
import {useEffect, useState} from "react";
import {useRegisterTeacherMutation} from "../redux/slices/teacherSlice.js";
import {useAddAcademicYearMutation, useGetAllAcademicYearsQuery} from "../redux/slices/academicYearSlice.js";
import {useAddAcademicTermMutation, useGetAllAcademicTermsQuery} from "../redux/slices/academicTermSlice.js";
import {useAddClassLevelMutation} from "../redux/slices/classLevelSlice.js";
import {useAddProgramMutation, useGetAllProgramsQuery} from "../redux/slices/programApiSlice.js";
import {useAddStudentMutation} from "../redux/slices/studentApiSlice.js";
import {useAddSubjectMutation} from "../redux/slices/subjectApiSlice.js";
import {useAddYearGroupMutation} from "../redux/slices/YearGroupApiSlice.js";
import {toast} from "react-toastify";

const Kanban = () => {
    const [teacherName, setTeacherName] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");

    const [academicYearName, setAcademicYearName] = useState("");
    const [ayFrom, setAyFrom] = useState("");
    const [ayTo, setAyTo] = useState("");

    const [termName, setTermName] = useState("");
    const [termDescription, setTermDescription] = useState("");

    const [classLevel, setClassLevel] = useState("");
    const [clDescription, setClDescription] = useState("");

    const [programName, setProgramName] = useState("");
    const [progDescription, setProgDescription] = useState("");

    const [subjectName, setSubjectName] = useState("");
    const [subjectDescription, setSubjectDescription] = useState("");

    const [yearGroupName, setYearGroupName] = useState("");
    const [yearGroupDescription, setYearGroupDescription] = useState("");

    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [studentPassword, setStudentPassword] = useState("");

    const [academicTermsdata, setAcademicTerms] = useState([]);

    const [programs, setPrograms] = useState([]);
    const [academicYearsData, setAcademicYearsData] = useState([]);
    const [programID, setProgramID] = useState("");
    const [academicTermId, setAcademicTermID] = useState("");
    const [academicYearId, setAcademicYearId] = useState("")

    const [registerTeacher,{ isLoading : isLoadingTeacher, isError: isErrorTeacher, isSuccess: isSuccessTeacher}] = useRegisterTeacherMutation();

    const [addAcademicYear, {isLoading: isLoadingYear, isError: isErrorYear, isSuccess: isSuccessYear}] = useAddAcademicYearMutation();

    const [addAcademicTerm, {isLoading: isLoadingTerm, isError: isErrorTerm, isSuccess: isSuccessTerm}] = useAddAcademicTermMutation();

    const [addClassLevel, {isLoading: isLoadingClassLevel, isError: isErrorClassLevel, isSuccess: isSuccessClassLevel}] = useAddClassLevelMutation();

    const [addProgram, {isLoading: isLoadingProgram, isError: isErrorProgram, isSuccess: isSuccessProgram}] = useAddProgramMutation();

    const [addSubject, {isLoading: isLoadingSubject, isError: isErrorSubject, isSuccess: isSuccessSubject}] = useAddSubjectMutation();
    const [addYearGroup, {isLoading: isLoadingYearGroup, isError: isErrorYearGroup, isSuccess: isSuccessYearGroup}] = useAddYearGroupMutation();

    const [addStudent, {isLoading: isLoadingStudent, isError: isErrorStudent, isSuccess: isSuccessStudent}] = useAddStudentMutation();

    const {data: classes ,isLoading: isLoadingPrograms, isError: isErrorPrograms, isSuccess: isSuccessPrograms} = useGetAllProgramsQuery();

    const {data: academicTerms ,isLoading: isLoadingAcademicTerms, isError: isErrorAcademicTerms, isSuccess: isSuccessAcademicTerms} = useGetAllAcademicTermsQuery();

    const {data: academicYears ,isLoading: isLoadingAcademicYears, isError: isErrorAcademicYears, isSuccess: isSuccessAcademicYears} = useGetAllAcademicYearsQuery();

    const handleTeacherSubmit =async (e) => {
        e.preventDefault();
        // use mutation to register a teacher
        try {
            const res = await registerTeacher(
                {name:teacherName, email:teacherEmail, password:teacherPassword}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    const handleAcademicYearSubmit = async(e) => {
        e.preventDefault();
        // use mutation to add an academic year
        try {
            const res = await addAcademicYear({name:academicYearName, fromYear:ayFrom, toYear:ayTo}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    const handleTermSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addAcademicTerm({name:termName, description:termDescription}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    const handleClassLevelSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addClassLevel({name:classLevel, description:clDescription}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    const handleProgramSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addProgram({name: programName, description: progDescription}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    const handleSubjectSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addSubject({name:subjectName, description:subjectDescription, academicTerm:academicTermId, programID}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    const handleYearGroupSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addYearGroup({name:yearGroupName, academicYear:academicYearId}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addStudent({name:studentName, email:studentEmail, password:studentPassword}).unwrap();
            const {message} = res;
            toast.success(message)
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (isSuccessPrograms) {
            setPrograms(classes);
            console.log(classes)
        }
    }, [classes, isSuccessPrograms]);

    useEffect(() => {
        if (isSuccessAcademicTerms) {
            setAcademicTerms(academicTerms);
            console.log(academicTerms)
        }
    },[academicTerms, isSuccessAcademicTerms]);

    useEffect(() => {
        if (isSuccessAcademicYears) {
            setAcademicYearsData(academicYears);
            console.log(academicYears)
        }
    }, [academicYearsData, isSuccessAcademicYears]);

    return (
        <>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Teacher"}/>
                <form
                    onSubmit={handleTeacherSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="teacherName" className={"block ml-2"}>Name</label>
                            <input type="text" id="teacherName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={teacherName}
                                   onChange={(e)=>setTeacherName(e.target.value)}
                            />
                        </div>
                        <div className={" flex-1"}>
                            <label htmlFor="teacherEmail" className={"block ml-2"}>Email</label>
                            <input type="text" id="teacherEmail"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={teacherEmail}
                                   onChange={(e)=>setTeacherEmail(e.target.value)}
                            />
                        </div>
                        <div className={" flex-1"}>
                            <label htmlFor="teacherPassword" className={"block ml-2"}>Password</label>
                            <input type="password" id="teacherPassword"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}
                                   value={teacherPassword}
                                   onChange={(e)=>setTeacherPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Teacher
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Academic Year"}/>
                <form
                    onSubmit={handleAcademicYearSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="academicYearName" className={"block ml-2"}>Name</label>
                            <input type="text" id="academicYearName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={academicYearName}
                                   onChange={(e)=>setAcademicYearName(e.target.value)}
                            />
                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="ayFrom" className={"block ml-2"}>From:</label>
                            <input type="text" id="ayFrom"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={ayFrom}
                                   onChange={(e)=>setAyFrom(e.target.value)}
                            />
                        </div>
                        <div className={" flex-1"}>
                            <label htmlFor="ayTo"
                                   className={"block ml-2"}>To:</label>
                            <input type="text" id="ayTo"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}
                                   value={ayTo}
                                   onChange={(e)=>setAyTo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Academic
                            Year
                        </button>
                    </div>
                </form>
            </div>

            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Academic Term"}/>
                <form
                    onSubmit={handleTermSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="termName" className={"block ml-2"}>Name</label>
                            <input type="text" id="termName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={termName}
                                   onChange={(e)=>setTermName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        {/*add text area and style it  */}
                        <label htmlFor="termDescription" className={"block ml-2"}>Description</label>
                        <textarea id="termDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}
                                  value={termDescription}
                                  onChange={(e)=>setTermDescription(e.target.value)}
                        />

                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Academic
                            Term
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Class Level"}/>
                <form
                    onSubmit={handleClassLevelSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="classLevel" className={"block ml-2"}>Name</label>
                            <input type="text" id="classLevel"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={classLevel}
                                   onChange={(e)=>setClassLevel(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        {/*add text area and style it  */}
                        <label htmlFor="clDescription" className={"block ml-2"}>Description</label>
                        <textarea id="clDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}
                                  value={clDescription}
                                  onChange={(e)=>setClDescription(e.target.value)}
                        />
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Class Level
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Program"}/>
                <form
                    onSubmit={handleProgramSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="programName" className={"block ml-2"}>Name</label>
                            <input type="text" id="programName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={programName}
                                   onChange={(e)=>setProgramName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        {/*add text area and style it  */}
                        <label htmlFor="progDescription" className={"block ml-2"}>Description</label>
                        <textarea id="progDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}
                                  value={progDescription}
                                  onChange={(e)=>setProgDescription(e.target.value)}
                        />
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Program
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Subject"}/>
                <form
                    onSubmit={handleSubjectSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectName" className={"block ml-2"}>Name</label>
                            <input type="text" id="subjectName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={subjectName}
                                   onChange={(e)=>setSubjectName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="academicTermSelect" className={"block ml-2"}>Academic Term</label>
                            <select id="academicTermSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={academicTermId}
                                    onChange={(e)=>setAcademicTermID(e.target.value)}
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
                                    value={programID}
                                    onChange={(e)=>setProgramID(e.target.value)}
                            >
                                <option value={""}>Select a program</option>
                                {programs?.data?.map((program, index) => (
                                    <option key={index} value={program._id}>{program.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className={"flex-1"}>
                        {/*add text area and style it  */}
                        <label htmlFor="subjectDescription" className={"block ml-2"}>Description</label>
                        <textarea id="subjectDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}
                                  value={subjectDescription}
                                  onChange={(e)=>setSubjectDescription(e.target.value)}
                        />
                    </div>

                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Program
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Year group"}/>
                <form
                    onSubmit={handleYearGroupSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectName" className={"block ml-2"}>Name</label>
                            <input type="text" id="subjectName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={yearGroupName}
                                   onChange={(e)=>setYearGroupName(e.target.value)}
                            />
                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectSelect" className={"block ml-2"}>Academic Year</label>
                            <select id="subjectSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                    value={academicYearId}
                                    onChange={(e)=>setAcademicYearId(e.target.value)}
                            >
                                <option>Select an academic Year</option>
                                {academicYearsData?.data?.map((year, index) => (
                                    <option key={index} value={year._id}>{year.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Program
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Student"}/>
                <form
                    onSubmit={handleStudentSubmit}
                >
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="studentName" className={"block ml-2"}>Name</label>
                            <input type="text" id="studentName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={studentName}
                                   onChange={(e)=>setStudentName(e.target.value)}
                            />
                        </div>
                        <div className={" flex-1"}>
                            <label htmlFor="studentEmail" className={"block ml-2"}>Email</label>
                            <input type="text" id="studentEmail"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}
                                   value={studentEmail}
                                   onChange={(e)=>setStudentEmail(e.target.value)}
                            />
                        </div>
                        <div className={" flex-1"}>
                            <label htmlFor="studentPassword" className={"block ml-2"}>Password</label>
                            <input type="password" id="studentPassword"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}
                                   value={studentPassword}
                                   onChange={(e)=>setStudentPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Student
                        </button>
                    </div>
                </form>
            </div>


        </>
    )
}

export default Kanban;