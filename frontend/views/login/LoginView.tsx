import {useRef, useState} from 'react';
import {motion} from "framer-motion";
import LoginForm from "@/components/loginForm";


export default function LoginView() {

    const dragAbleConstraints = useRef(null);

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
                        <LoginForm/>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
