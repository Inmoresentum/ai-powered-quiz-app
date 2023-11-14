import {useAuth} from 'Frontend/util/auth.js';
import {useRef, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {TextField} from "@hilla/react-components/TextField.js";
import {PasswordField} from "@hilla/react-components/PasswordField";
import {UserEndpoint} from "@/generated/endpoints";
import {Lock, MailIcon, User2} from "lucide-react";


export default function LoginView() {

    const dragAbleConstraints = useRef(null);

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();
    const {login} = useAuth();

    return (
        <>
            <section className="login-page-section">
                <div className="box" ref={dragAbleConstraints}>
                        {/*Mainly for decoration purpose*/}
                    <div className="square" style={{"--i": 0} as any}></div>
                    <div className="square" style={{"--i": 1} as any}></div>
                    <div className="square" style={{"--i": 2} as any}></div>
                    <div className="square" style={{"--i": 3} as any}></div>
                    <div className="square" style={{"--i": 4} as any}></div>
                    <div className="square" style={{"--i": 5} as any}></div>

                    <motion.div className="login-page-container"
                                initial={{opacity: 0, y: -50}}
                                animate={{opacity: 1, y: 0}}
                                drag={true}
                                dragConstraints={dragAbleConstraints}
                                transition={{duration: 1, ease: "easeOut"}}>
                        <a href={"/"}>
                            <img
                                src="images/ai_quiz_logo.png"
                                alt="icons/icon.png"
                                className="w-[110px] h-[110px] rounded-2xl hover:scale-105
                             hover:brightness-125 hover:contrast-150 hover:saturate-150
                              transition-all duration-300 ease-in-out"
                            />
                        </a>
                        <h2 className="text-2xl font-bold mb-4 animate-pulse">Login</h2>
                        <form className="max-w-md mx-auto">
                            <div className="relative mb-6">
                                <label htmlFor="text" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                    Username
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-600">
                                      <User2 size={24}/>
                                    </span>
                                    <input
                                        type="text"
                                        id="text"
                                        className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white
                                     bg-clip-padding backdrop-filter backdrop-blur-md placeholder-gray-500
                                      focus:placeholder-gray-300 focus:outline-none focus:border-blue-500
                                       rounded-3xl text-gray-800 text-base shadow-md"
                                        placeholder="Enter your username"
                                        onChange={event => {
                                            console.log(event.target.value);
                                            setUsername(event.target.value);
                                        }}
                                    />

                                </div>
                            </div>
                            <div className="relative mb-6">
                                <label htmlFor="password" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-600">
                                      <Lock size={24}/>
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding
                                     backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-300
                                      focus:outline-none focus:border-blue-500 rounded-3xl text-gray-800 text-base shadow-md"
                                        placeholder="Enter Your password"
                                        onChange={event => {
                                            setPassword(event.target.value);
                                        }}
                                    />

                                </div>
                            </div>

                            <div className="flex justify-end items-center mb-6">
                                <a href={"/auth/forgot/password"}
                                   className="text-gray-200 hover:text-black hover:underline
                                   hover:translate-y-[-2px] transition-colors duration-300 ease-linear tooltip"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="button"
                                className="w-full text-white py-2 px-4 rounded-full transition-colors duration-300
                             ease-in-out bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
                              hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500
                               focus:from-blue-400 focus:via-indigo-500 focus:to-purple-500 login-animate-gradient-x"
                                onClick={async event => {
                                    event.preventDefault();
                                    const {error} = await login(username, password);
                                    if (!error) {
                                        navigate("/");
                                    }
                                }}
                            >
                                Log In
                            </button>

                            <span className="flex justify-between text-purple-700 font-medium m-2">
                            New here And No Account?
                                <a
                                    href={"/auth/register/"}
                                    className="text-gray-200 hover:text-black hover:underline
                                     hover:translate-y-[-2px] transition-colors duration-300
                                      ease-linear ml-2 tooltip"
                                    data-tooltip="Click to register an account with us">
                                    Register account
                                </a>
                            </span>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
