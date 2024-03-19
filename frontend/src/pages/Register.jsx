import React, {useEffect, useState} from 'react';
import HomeNavbar from "./HomeNavbar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setCredentials} from "../redux/slices/authSlice.js";
import {useRegisterMutation} from "../redux/slices/adminApiSlice.js";

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {userInfo} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register,{isLoading}] = useRegisterMutation()

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e)=>{
        e.preventDefault()
        try{
            // verify password confirmation first
            if(password !== confirmPassword){
                console.log('Passwords do not match')
                return
            }
            const res = await register({name,email, password}).unwrap()
            const {message} = res
            console.log(message)
            navigate('/login')
        }catch (error) {
            /*toast.error(error?.data?.msg || error.error)*/
            console.log(error)
        }
    }
    return (
        <>
            <HomeNavbar />
        <div className="flex items-center justify-center mt-20">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight text-center">
                        Create an account
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                        Start your 14-day free trial
                    </p>
                </div>
                <form className="p-6"
                    onSubmit={submitHandler}>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="username">Username</label>
                            <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="username"
                            name={"name"}
                            placeholder="Username"
                            required=""
                            type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email">Email</label>
                            <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            placeholder="Email"
                            required=""
                            name={"email"}
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="password">Password</label>
                                <a
                                className="ml-2 text-sm font-medium shcn-tap-accent" href="#">
                                Generate secure password
                                </a>
                            </div>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="password"
                                placeholder="Password"
                                required=""
                                type="password"
                                name={"password"}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="confirm-password"
                                placeholder="Confirm Password"
                                required=""
                                type="password"
                                name={"confirmPassword"}
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border-1 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-black/90 h-10 px-4 py-2 w-full hover:text-white"
                            type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default Register;