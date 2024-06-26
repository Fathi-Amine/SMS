import React from 'react';
import {Link, NavLink} from "react-router-dom";
import { FaSchoolFlag } from "react-icons/fa6";
import {MdOutlineCancel} from "react-icons/md";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {links, teacherLinks} from '../data/dummy.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../redux/interactivitySlices.js'

const Sidebar = () => {
    const menu = useSelector(state => state.interactivity.menu);
    const screenSize = useSelector(state => state.interactivity.screenSize);
    const userInfo = useSelector(state => state.auth.userInfo);
    const activeLink = "flex items-center gap-5 pt-3 pb-2.5 pl-4 rounded-lg text-md m-2";
    const normalLink = "flex items-center gap-5 pt-3 pb-2.5 pl-4 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2"
    const dispatch = useDispatch();

    const displayLinks = userInfo.data.role === 'admin' ? links : teacherLinks;


    const handleCloseMenu = () => {
        if (menu && screenSize <= 900) {
            dispatch(toggleMenu());
        }
    }
    return (
        <div className={"ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10"}>
            {menu && (
                <>
                    <div className={"flex justify-between items-center"}>
                        <Link to={"/"} onClick={handleCloseMenu} className={"items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"}>
                            <FaSchoolFlag /><span>Dashy</span>
                        </Link>
                        <TooltipComponent content={"Menu"} position={"BottomCenter"}>
                            <button type={"button"}
                                    onClick={()=> dispatch(toggleMenu())}
                                    className={"text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"}
                            >
                                <MdOutlineCancel />
                            </button>
                        </TooltipComponent>
                    </div>
                    <div className={"mt-10"}>
                        {displayLinks.map((item, index) => (
                            <div key={index}>
                                <p className={"text-gray-400 m-3 mt-4 uppercase"}>
                                    {item.title}
                                </p>
                                {item.links.map((link, index)=>(
                                    <NavLink to={`${link.name}`}
                                             key={index}
                                             className={({isActive})=> isActive ? activeLink : normalLink}
                                             onClick={handleCloseMenu}

                                    >
                                        <span>{link.icon}</span>
                                        <span className={"capitalize"}>{link.name}</span>
                                    </NavLink>

                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;