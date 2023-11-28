import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/util/auth";

export default function Navbar() {
    const {state, logout} = useAuth();
    const navigator = useNavigate();
    console.log(state);

    return (
        <nav className="flexBetween max-container padding-container relative z-30 py-5 w-full">
            <a href="/" className="flex justify-center items-center font-bold uppercase text-xl">
                <img src="images/ai_quiz_logo.png" alt="logo" width={56} height={29}
                     className="hover:scale-105 duration-300 ease-linear animate-pulse"/>
                <h1 className="px-2 shadow-2xl hover:shadow-green-500 hover:text-indigo-600 ease-in-out duration-300">QuizBotIQ</h1>
            </a>

            <ul className="hidden h-full gap-12 lg:flex">
                <NavLink to="/about"
                         className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">First
                    Menu</NavLink>
                <NavLink to="/"
                         className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">Second
                    Menu</NavLink>
                <NavLink to="/"
                         className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">Third
                    Menu</NavLink>
                <NavLink to="/"
                         className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">Forth
                    Menu</NavLink>
            </ul>

            <div className="lg:flexCenter hidden">
                {state.user ?
                    <Button className="font-bold rounded-2xl shadow hover:shadow-2xl hover:bg-gray-200
                 hover:shadow-green-400 hover:ring-2 hover:ring-green-400 hover:text-gray-90 duration-300 ease-linear"
                            onClick={async () => {
                                await logout();
                            }}
                    >
                        Logout
                    </Button> :
                    <Button className="font-bold rounded-2xl shadow hover:shadow-2xl hover:bg-gray-200
                 hover:shadow-green-400 hover:ring-2 hover:ring-green-400 hover:text-gray-90 duration-300 ease-linear"
                            onClick={() => navigator("/login")}
                    >
                        Login
                    </Button>
                }
            </div>

            <img
                src="images/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="inline-block cursor-pointer lg:hidden"
            />
        </nav>
    )
}