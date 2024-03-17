import React from 'react';
import {clearCredentials} from "../redux/slices/authSlice.js";
import {useLogoutMutation} from "../redux/slices/adminApiSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const UserProfile = () => {
    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const logoutHandler = async ()=>{
        try {
            await logout().unwrap()
            dispatch(clearCredentials())
            navigate('/')
        }catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={"flex justify-center items-center flex-col"}>
            <button
                className={"bg-red-500 text-white p-2 rounded-md"}
                onClick={logoutHandler}>Logout</button>
            UserProfile
        </div>
    );
};

export default UserProfile;