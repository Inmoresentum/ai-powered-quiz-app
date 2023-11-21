import {NavLink} from "react-router-dom";
import AccountRegistrationForm from "@/components/accountRegistrationForm";

export default function RegistrationView() {
    return (
        <>
            <div className="flex items-center justify-center h-auto w-auto ">
                <div
                    className="bg-gray-200 min-w-[250px] rounded-2xl md:min-w-[450px] flex flex-col shadow-xl
                     items-center justify-center hover:shadow-2xl duration-300 ease-linear hover:bg-gray-100 m-20">
                    <NavLink to={"/"} className="flex flex-row items-center justify-center">
                        <img
                            src="images/ai_quiz_logo.png"
                            alt="icons/icon.png"
                            className="w-[110px] h-[110px] rounded-2xl hover:scale-105
                             hover:brightness-125 hover:contrast-150 hover:saturate-150
                              transition-all duration-300 ease-in-out m-2 p-2"
                        />
                    </NavLink>
                    <h1 className="uppercase text-xl bg-green-500 rounded-full p-2 m-2 text-[24px] font-[550]
                     bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent
                      font-serif">
                        Register An Account With us
                    </h1>
                    <AccountRegistrationForm/>
                </div>
            </div>
        </>
    );
}