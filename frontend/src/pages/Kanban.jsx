import {Header} from "../components/index.jsx";
import {useState} from "react";
import {useRegisterTeacherMutation} from "../redux/slices/teacherSlice.js";

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

    const [registerTeacher,{ isLoading, isError, isSuccess}] = useRegisterTeacherMutation();

    const handleTeacherSubmit =async (e) => {
        e.preventDefault();
        // use mutation to register a teacher
        try {
            const res = await registerTeacher(
                {name:teacherName, email:teacherEmail, password:teacherPassword}).unwrap();
            const {message} = res;
            console.log(res, message);
        }catch (e) {
            console.log(e)
        }
    }

    const handleAcademicYearSubmit = (e) => {
        e.preventDefault();
        console.log(academicYearName, ayFrom, ayTo);
    }

    const handleTermSubmit = (e) => {
        e.preventDefault();
        console.log(termName, termDescription);
    }

    const handleClassLevelSubmit = (e) => {
        e.preventDefault();
        console.log(classLevel, clDescription);
    }

    const handleProgramSubmit = (e) => {
        e.preventDefault();
        console.log(programName, progDescription);
    }

    const handleSubjectSubmit = (e) => {
        e.preventDefault();
        console.log(subjectName, subjectDescription);
    }

    const handleYearGroupSubmit = (e) => {
        e.preventDefault();
        console.log(yearGroupName, yearGroupDescription);
    }

    const handleStudentSubmit = (e) => {
        e.preventDefault();
        console.log(studentName, studentEmail, studentPassword);
    }

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
                <form action="">
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
                <form action="">
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="termName" className={"block ml-2"}>Name</label>
                            <input type="text" id="termName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}/>
                        </div>
                    </div>
                    <div>
                        {/*add text area and style it  */}
                        <label htmlFor="termDescription" className={"block ml-2"}>Description</label>
                        <textarea id="termDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}/>
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
                <form action="">
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="classLevel" className={"block ml-2"}>Name</label>
                            <input type="text" id="classLevel"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}/>
                        </div>
                    </div>
                    <div>
                        {/*add text area and style it  */}
                        <label htmlFor="clDescription" className={"block ml-2"}>Description</label>
                        <textarea id="clDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}/>
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Class Level
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Program"}/>
                <form action="">
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="programName" className={"block ml-2"}>Name</label>
                            <input type="text" id="programName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}/>
                        </div>
                    </div>
                    <div>
                        {/*add text area and style it  */}
                        <label htmlFor="progDescription" className={"block ml-2"}>Description</label>
                        <textarea id="progDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}/>
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Program
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Subject"}/>
                <form action="">
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectName" className={"block ml-2"}>Name</label>
                            <input type="text" id="subjectName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}/>
                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectSelect" className={"block ml-2"}>Academic Term</label>
                            <select id="subjectSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}>
                                <option>AMS</option>
                            </select>
                        </div>

                    </div>
                    <div className={"mt-2"}>
                        {/*add text area and style it  */}
                        <label htmlFor="subjectDescription" className={"block ml-2"}>Description</label>
                        <textarea id="subjectDescription" rows={4}
                                  className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}/>
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Program
                        </button>
                    </div>
                </form>
            </div>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"}>
                <Header title={"Add Year group"}/>
                <form action="">
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectName" className={"block ml-2"}>Name</label>
                            <input type="text" id="subjectName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}/>
                        </div>
                        <div className={"flex-1"}>
                            <label htmlFor="subjectSelect" className={"block ml-2"}>Academic Year</label>
                            <select id="subjectSelect"
                                    className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}>
                                <option>AMS</option>
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
                <form action="">
                    <div className={"flex items-center gap-2 flex-wrap"}>
                        <div className={"flex-1"}>
                            <label htmlFor="studentName" className={"block ml-2"}>Name</label>
                            <input type="text" id="studentName"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}/>
                        </div>
                        <div className={" flex-1"}>
                            <label htmlFor="studentEmail" className={"block ml-2"}>Email</label>
                            <input type="text" id="studentEmail"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border  flex-1"}/>
                        </div>
                        <div className={" flex-1"}>
                            <label htmlFor="studentPassword" className={"block ml-2"}>Password</label>
                            <input type="password" id="studentPassword"
                                   className={"border-1 border-gray-300 rounded-lg p-2 outline-none w-full box-border"}/>
                        </div>
                    </div>
                    <div className={"flex justify-end mt-4"}>
                        <button type={"submit"} className={"bg-blue-500 text-white rounded-lg p-2 px-4"}>Add Teacher
                        </button>
                    </div>
                </form>
            </div>


        </>
    )
}

export default Kanban;