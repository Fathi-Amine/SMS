import React from 'react';
import {useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {FiSettings} from "react-icons/fi";
import {Navbar, Sidebar} from "../components/index.jsx";
import Home from "./Home.jsx";
import {
    AcademicTerms,
    Admins,
    Area,
    Bar,
    Calendar, ClassLevels, ColorMapping,
    ColorPicker,
    Ecommerce,
    Editor, Exams,
    Financial,
    Kanban,
    Line,
    Pie, Programs, Pyramid, Stacked, Students, Subjects, Teachers, YearGroups
} from "./index.jsx";
import AcademicYear from "./academicYear.jsx";
import {
    AcademicTermsManagement, AcademicYearsManagement,
    ClassLevelsManagement,
    ExamManagement, ProgramManagement,
    StudentManagement,
    SubjectManagement,
    TeacherManagement,
    YearGroupManagement
} from "./management/index.jsx";

const Dashboard = () => {
    const menu = useSelector(state => state.interactivity.menu);

    console.log(menu)
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
                                <Route path={"/dashy"} element={<Ecommerce />}/>
                                <Route path={"/ecommerce"} element={<Ecommerce/>}/>
                                {/*Pages*/}
                                <Route path={"/teachers"} element={<Teachers/>}/>
                                <Route path={"/students"} element={<Students/>}/>
                                <Route path={"/admins"} element={<Admins/>}/>
                                <Route path={"/programs"} element={<Programs/>}/>
                                <Route path={"/subjects"} element={<Subjects/>}/>
                                <Route path={"/academic-terms"} element={<AcademicTerms/>}/>
                                <Route path={"/class-levels"} element={<ClassLevels/>}/>
                                <Route path={"/academic-years"} element={<AcademicYear/>}/>
                                <Route path={"/exams"} element={<Exams/>}/>
                                <Route path={"/groups"} element={<YearGroups/>}/>
                                <Route path={"/manage/groups/:id"} element={<YearGroupManagement/>}/>
                                <Route path={"/manage/teachers/:id"} element={<TeacherManagement/>}/>
                                <Route path={"/manage/students/:id"} element={<StudentManagement/>}/>
                                <Route path={"/manage/subjects/:id"} element={<SubjectManagement/>}/>
                                <Route path={"/manage/exams/:id"} element={<ExamManagement/>}/>
                                <Route path={"/manage/class-level/:id"} element={<ClassLevelsManagement/>}/>
                                <Route path={"/manage/program/:id"} element={<ProgramManagement/>}/>
                                <Route path={"/manage/academic-term/:id"} element={<AcademicTermsManagement/>}/>
                                <Route path={"/manage/academic-year/:id"} element={<AcademicYearsManagement/>}/>
                                {/*Apps*/}
                                <Route path={"/data-entry"} element={<Kanban/>}/>
                                <Route path={"/editor"} element={<Editor/>}/>
                                <Route path={"/calendar"} element={<Calendar/>}/>
                                <Route path={"/color-picker"} element={<ColorPicker/>}/>

                                {/*Charts*/}
                                <Route path={"/line"} element={<Line/>}/>
                                <Route path={"/area"} element={<Area/>}/>
                                <Route path={"/bar"} element={<Bar/>}/>
                                <Route path={"/pie"} element={<Pie/>}/>
                                <Route path={"/financial"} element={<Financial/>}/>
                                <Route path={"/color-mapping"} element={<ColorMapping/>}/>
                                <Route path={"/pyramid"} element={<Pyramid/>}/>
                                <Route path={"/stacked-chart"} element={<Stacked/>}/>

                            </Routes>
                        </div>
                    </div>
                </div>
            {/*</Router>*/}
        </div>
    )
}

export default Dashboard;