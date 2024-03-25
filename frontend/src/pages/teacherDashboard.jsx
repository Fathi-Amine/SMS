import React from 'react';
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {Navbar, Sidebar} from "../components/index.jsx";
import {FiSettings} from "react-icons/fi";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {Exams} from "./index.jsx";
import TeacherManagingExams from "./management/TeacherManagingExams.jsx";
import TeacherDataEntry from "./TeacherDataEntry.jsx";
import Questions from "./Questions.jsx";
import TeacherManagingQuestions from "./management/TeacherManagingQuestions.jsx";

const TeacherDashboard = () => {
    const menu = useSelector(state => state.interactivity.menu);
    return (
        <div>
            {/*<Router>*/}
            <div className={"flex relative dark:bg-main-dark-bg"}>
                <div className={"fixed right-4 bottom-4"} style={{zIndex: '1000'}}>
                    <TooltipComponent content={"Settings"} position={"Top"}>
                        <button type={"button"} className={"text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"}
                                style={{background:'blue', borderRadius: '50%'}}
                        >
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {menu ? (
                    <div className={"w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white"}>
                        <Sidebar />
                    </div>
                ) : (
                    <div className={"w-0 dark:bg-secondary-dark-bg"}>
                        <Sidebar />
                    </div>

                )}
                <div className={
                    `dark:bg-main-bg bg-main-bg min-h-screen w-full ${menu ? "md:ml-72" : "flex-2"}`}
                >
                    <div className={"fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full"}>
                        <Navbar/>
                    </div>

                    <div>
                        <Routes>
                            {/* Dashboard*/}
                            <Route path={"/dashboard"} element={<Exams />}/>
                            <Route path={"/exams"} element={<Exams />}/>
                            <Route path={"/questions"} element={<Questions />}/>
                            <Route path={"/data-entry"} element={<TeacherDataEntry />}/>
                            <Route path={"/manage/exams/:id"} element={<TeacherManagingExams />}/>
                            <Route path={"/manage/question/:id"} element={<TeacherManagingQuestions />}/>

                        </Routes>
                    </div>
                </div>
            </div>
            {/*</Router>*/}
        </div>
    );
};

export default TeacherDashboard;