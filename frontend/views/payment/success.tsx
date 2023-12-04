import {Helmet} from "react-helmet-async";
import {Link, NavLink} from "react-router-dom";
import {Separator} from "@/components/ui/separator";
import React from "react";
import ReactConfetti from "react-confetti";

export default function PaymentSuccess() {
    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-400 to-orange-300">
            <Helmet>
                <title>Payment is Successful</title>
                <meta name="description"
                      content="This is componenet is for displaying message for payment xD"/>
            </Helmet>
            <ReactConfetti gravity={0.1}/>
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

                <h1 className="font-bold text-3xl font-sans ">
                    <NavLink to="/">
                        QuizBOT IQ
                    </NavLink>
                </h1>
                <Separator className="my-0.5 bg-pink-400 h-[2px] w-[75%]"/>
                <div
                    className="m-6 text-4xl text-green-500 uppercase bg-gray-300 w-full text-center rounded-full font-sans">
                    Yay Payment is Successful
                </div>
            </div>
        </div>
    );
}