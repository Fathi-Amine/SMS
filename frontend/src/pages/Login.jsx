import React, {useEffect, useState} from 'react';
import HomeNavbar from "./HomeNavbar.jsx";
import {useLoginMutation} from "../redux/slices/adminApiSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setCredentials} from "../redux/slices/authSlice.js";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login,{isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(userInfo){
            navigate('/admin/dashy')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e)=>{
        e.preventDefault()
        try{
            console.log(email, password)
            const res = await login({email, password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
        }catch (error) {
            /*toast.error(error?.data?.msg || error.error)*/
            console.log(error)
        }
    }
    return (
        <>
            <HomeNavbar />
        <div className="flex items-center justify-center h-screen gap-4 px-4">
            <div className="w-full max-w-sm space-y-4">
                <header className="space-y-2">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Acme School</h1>
                        <p className="text-sm font-medium tracking-wide opacity-60">Sign in to your account</p>
                    </div>
                </header>
                <div
                    className="space-y-2"
                    onSubmit={submitHandler}>
                    <form className="space-y-1">
                        <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Email"
                        required=""
                        name={"email"}
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                        <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Password"
                        required=""
                        type="password"
                        name={"password"}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />

                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border-1 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-black/90 h-10 px-4 py-2 w-full hover:text-white"
                            type="submit">
                            Login
                        </button>
                    </form>
                    <div className="grid grid-cols-2 gap-2">
                        <a className="text-sm font-medium" href="#">
                        Forgot Password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;