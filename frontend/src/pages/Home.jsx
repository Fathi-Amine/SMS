import React from 'react';
import justImage from "../assets/react.svg";
import HomeNavbar from "./HomeNavbar.jsx";

const Home = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="space-y-6">
                <HomeNavbar />
                <main>
                    <section className="overflow-hidden">

                        <div
                            className="container grid items-center gap-6 px-4 text-center lg:grid-cols-12 lg:px-6 xl:gap-12">
                            <div
                                className="space-y-3 lg:col-start-2 lg:col-span-5 xl:col-start-3 xl:col-span-4 xl:space-y-5">
                                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                                    Manage your school with ease.
                                </h1>
                                <p className="max-w-prose text-gray-600 dark:text-gray-400">
                                    Everything you need to run your school in one place. Save time and
                                    stay organized.
                                </p>
                            </div>
                            <div className="lg:col-span-5 xl:col-span-4"><img src={justImage} width="800"
                                                                              height="400"
                                                                              alt="Students"
                                                                              className="mx-auto rounded-xl object-cover lg:ml-auto lg:mr-0"
                                                                              style={{aspectRatio: 800 / 400, objectFit: "cover"}}/>
                            </div>
                        </div>
                    </section>
                    <section className="py-12">
                        <div
                            className="container grid items-center gap-6 px-4 text-center lg:grid-cols-12 lg:px-6 xl:gap-12">
                            <div className="space-y-3 lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                                    Modernize your school.
                                </h2>
                                <p className="max-w-prose text-gray-600 dark:text-gray-400">
                                    Our platform provides the tools you need to streamline
                                    administration, communicate with parents, and support teachers.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="bg-gray-100 py-12">
                        <div
                            className="container grid items-center gap-6 px-4 text-center lg:grid-cols-12 lg:px-6 xl:gap-12">
                            <div className="space-y-3 lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                                    Our Services
                                </h2>
                            </div>
                            <div
                                className="grid gap-6 sm:grid-cols-2 lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8">
                                <div className="flex flex-col items-center space-y-2"><img src={justImage}
                                                                                           width="200"
                                                                                           height="200" alt="Feature 1"
                                                                                           className="rounded-full object-cover"
                                                                                           style={{aspectRatio: 200 / 200, objectFit: "cover"}}/>
                                    <h3 className="text-xl font-bold">Parent Communication</h3>
                                    <p className="text-center text-gray-500 dark:text-gray-400">
                                        Keep parents informed with announcements, newsletters, and
                                        messaging.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center space-y-2"><img src={justImage}
                                                                                           width="200"
                                                                                           height="200" alt="Feature 2"
                                                                                           className="rounded-full object-cover"
                                                                                           style={{aspectRatio: 200 / 200, objectFit: "cover"}}/>
                                    <h3 className="text-xl font-bold">Student Information</h3>
                                    <p className="text-center text-gray-500 dark:text-gray-400">
                                        Access student records, track attendance, and manage grades.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center space-y-2"><img src={justImage}
                                                                                           width="200"
                                                                                           height="200" alt="Feature 3"
                                                                                           className="rounded-full object-cover"
                                                                                           style={{aspectRatio: 200 / 200, objectFit: "cover"}}/>
                                    <h3 className="text-xl font-bold">Online Registration</h3>
                                    <p className="text-center text-gray-500 dark:text-gray-400">
                                        Simplify enrollment with online forms and registration.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center space-y-2"><img src={justImage}
                                                                                           width="200"
                                                                                           height="200" alt="Feature 4"
                                                                                           className="rounded-full object-cover"
                                                                                           style={{aspectRatio: 200 / 200, objectFit: "cover"}}/>
                                    <h3 className="text-xl font-bold">Homework Assignments</h3>
                                    <p className="text-center text-gray-500 dark:text-gray-400">
                                        Teachers can post assignments and students can submit homework
                                        online.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-12">
                        <div
                            className="container grid items-center gap-6 px-4 text-center lg:grid-cols-12 lg:px-6 xl:gap-12">
                            <div className="space-y-3 lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
                                    What people are saying
                                </h2>
                            </div>
                            <div
                                className="grid gap-6 sm:grid-cols-2 lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8">
                                <div className="flex flex-col items-center space-y-2"><img src={justImage}
                                                                                           width="150"
                                                                                           height="150" alt="User 1"
                                                                                           className="rounded-full object-cover"
                                                                                           style={{aspectRatio: 150 / 150, objectFit: "cover"}}/>
                                    <blockquote className="prose text-gray-500 dark:text-gray-400">
                                        “The school management system has made my job so much
                                        easier. I can quickly access student information, communicate
                                        with parents, and grade assignments.”
                                    </blockquote>
                                    <cite className="text-sm font-semibold">Alice Johnson</cite>
                                </div>
                                <div className="flex flex-col items-center space-y-2"><img src={justImage}
                                                                                           width="150"
                                                                                           height="150" alt="User 2"
                                                                                           className="rounded-full object-cover"
                                                                                           style={{aspectRatio: 150 / 150, objectFit: "cover"}}/>
                                    <blockquote className="prose text-gray-500 dark:text-gray-400">
                                        “I love how I can see my child’s progress and
                                        communicate with the teacher through the school app. It keeps me
                                        informed and involved.”
                                    </blockquote>
                                    <cite className="text-sm font-semibold">Michael Lee</cite>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="bg-white">
                    <div
                        className="container grid items-center gap-6 py-8 md:grid-cols-12 md:py-12 lg:grid-cols-12 lg:py-16 xl:grid-cols-12 xl:py-20">
                        <div
                            className="flex flex-col items-center justify-center space-y-2 md:col-span-3 md:flex-row md:space-y-0 md:space-x-4">
                            <div className="w-10 h-10"><img src={justImage} width="40" height="40" alt="Acme"
                                                            style={{aspectRatio: 40 / 40, objectFit: "cover"}}/></div>
                            <p className="text-sm text-center text-gray-500 md:text-left dark:text-gray-400">
                                © 2023 Acme Inc. All rights reserved.
                            </p>
                        </div>
                        <ul className="flex justify-center space-x-4 text-sm md:justify-end md:col-span-9">
                            <li><a className="text-gray-500 dark:text-gray-400" href="#">
                                Privacy
                            </a></li>
                            <li><a className="text-gray-500 dark:text-gray-400" href="#">
                                Terms
                            </a></li>
                            <li><a className="text-gray-500 dark:text-gray-400" href="#">
                                Contact
                            </a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Home;