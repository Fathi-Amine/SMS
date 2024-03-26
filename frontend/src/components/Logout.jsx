import React from 'react';
import {AiOutlineLogout} from "react-icons/ai";
import {useLogoutMutation} from "../redux/slices/adminApiSlice.js";
import {clearCredentials} from "../redux/slices/authSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutTeacherMutation} from "../redux/slices/teacherSlice.js";

const Logout = () => {
    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()
    const [logoutTeacher] = useLogoutTeacherMutation()
    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("logout");
        try {

            if (userInfo?.data?.role === "admin") {
                await logout().unwrap();
                dispatch(clearCredentials());
                navigate("/admin/login")
            }else if (userInfo?.data?.role === "teacher") {
                await logoutTeacher().unwrap();
                dispatch(clearCredentials());
                navigate("/teacher/login")
            }
        }catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleLogout}>
                <button type={"submit"} style={{color: "blue"}} className={"relative text-xl rounded-full p-3 hover:bg-gray-light"} >
                    <AiOutlineLogout />
                </button>
            </form>
        </>
    );
};

export default Logout;