import React from 'react';
import justImage from "../assets/react.svg";
import {Link, Route} from "react-router-dom";

const HomeNavbar = () => {
    return (
        <div>
            <header className="bg-white shadow-sm">
                <div className="container lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
                    <div className="sm:flex sm:items-center sm:space-y-0 lg:col-span-4 xl:col-span-3">
                        <div className="w-10 h-10">
                            <img src={justImage} width="40" height="40" alt="Acme"
                                 style={{aspectRatio: 40 / 40, objectFit: "cover"}}/>
                        </div>
                        <p className="text-lg font-semibold tracking-wide">Acme</p>
                    </div>
                    <nav className="sm:col-span-8 lg:col-span-7 xl:col-span-6">
                        <ul
                            className="flex items-center justify-center space-x-4 text-sm font-medium tracking-wide sm:justify-end">
                            <li>
                                <a href="#">Features</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Testimonials</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center justify-end space-x-4 lg:col-span-1">
                        <Link className="text-sm font-medium" to={"/login"}>Log in</Link>
                        <Link className="text-sm font-medium" to={"/register"}>Sign up</Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HomeNavbar;