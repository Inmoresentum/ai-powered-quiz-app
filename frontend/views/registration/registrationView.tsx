import {Link} from "react-router-dom";
import AccountRegistrationForm from "@/components/auth/accountRegistrationForm";
import {Separator} from "@/components/ui/separator";
import React, {useState, useCallback} from 'react';
import {Helmet} from "react-helmet-async";

export default function RegistrationView() {
    const [formSubmissionSuccessful, setFormSubmissionSuccessful] = useState(false);

    const handleSuccessfulFormSubmissionStateChange = useCallback(() => {
        setFormSubmissionSuccessful(true);
    }, []);

    return (
        <div className="flex items-center content-center justify-center ">
            <Helmet>
                <title>Account Registration</title>
                <meta name="description"
                      content="Create An account with us"/>
            </Helmet>
            {!formSubmissionSuccessful ? (
                <div
                    className={`bg-gray-200 min-w-full rounded-2xl md:min-w-[450px] lg:md:min-w-[550px] flex flex-col shadow-xl items-center justify-center hover:shadow-2xl drop-shadow-2xl duration-300 ease-linear hover:bg-gray-100 md:m-20`}>
                    <Link to="/" className="flex flex-row items-center justify-center">
                        <img
                            src="images/ai_quiz_logo.png"
                            alt="icons/icon.png"
                            className="w-[110px] h-[110px] rounded-2xl hover:scale-105
                             hover:brightness-125 hover:contrast-150 hover:saturate-150
                              transition-all duration-300 ease-in-out m-2 p-2"
                        />
                    </Link>

                    <Separator className="my-0.5 bg-pink-400 h-[2px] w-[75%]"/>

                    <h1 className="uppercase text-xl bg-green-500 rounded-full p-2 m-2 text-[24px] font-[550]
                     bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent
                      font-serif">
                        Register An Account With us
                    </h1>
                    <Separator className="my-0.5 bg-pink-400 h-[2px] w-[75%]"/>
                    <AccountRegistrationForm onSuccessfulFormSubmit={handleSuccessfulFormSubmissionStateChange}/>
                </div>
            ) : (
                <div
                    className="h-screen w-screen flex flex-wrap items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100 ">
                    <div
                        className="bg-gray-100 min-w-full rounded-2xl md:min-w-[450px] lg:md:min-w-[550px] flex flex-col shadow-xl items-center justify-center hover:shadow-2xl drop-shadow-2xl duration-300 ease-linear hover:bg-gray-100 md:m-20 md:hover:scale-105">

                        <Link to="/" className="flex flex-row items-center justify-center">
                            <img
                                src="images/ai_quiz_logo.png"
                                alt="icons/icon.png"
                                className="w-[110px] h-[110px] rounded-2xl hover:scale-105
                             hover:brightness-125 hover:contrast-150 hover:saturate-150
                              transition-all duration-300 ease-in-out m-2 p-2"
                            />
                        </Link>
                        <h1 className="font-bold text-3xl font-sans ">QuizBOT IQ</h1>
                        <Separator className="my-0.5 bg-pink-400 h-[2px] w-[75%]"/>


                        <div
                            className="text-xl font-[550px] p-4 m-4 bg-gradient-to-r from-rose-400 via-fuchsia-300 to-rose-500 rounded-full duration-300 ease-linear">
                            Account Registration successful. Please check your <span
                            className="underline font-bold ">email</span> for further instructions
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
}