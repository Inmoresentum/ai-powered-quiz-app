import {Link, NavLink, useNavigate} from "react-router-dom";
// @ts-ignore
import {HashLink} from "react-router-hash-link";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/util/auth";
import {ChevronUp, MenuIcon, X} from "lucide-react";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Role from "@/generated/com/example/application/entities/user/Role";

export default function Navbar() {
    const {state, logout} = useAuth();
    const navigator = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const toggleMenu = () => {
        console.log("clicked");
        setIsOpen(!isOpen);
    };

    const menuVariants = {
        open: {
            x: 0,
            transition: {type: 'spring', stiffness: 100}
        },
        closed: {
            x: "-100%",
            transition: {type: 'spring', stiffness: 100}
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            // Todo: replace with a new recommended way as per description
            const currentScrollPos = window.pageYOffset;
            const visible = prevScrollPos > currentScrollPos;
            setPrevScrollPos(currentScrollPos);
            setVisible(visible);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <nav
            className={`flexBetween max-container padding-container relative z-30 py-5 w-full ${visible ? "sticky top-0" : "hidden lg:sticky lg:top-0"} bg-white bg-opacity-65 backdrop-filter backdrop-blur-lg rounded-l-full rounded-r-full lg:p-4`}>
            <NavLink to="/" className="flex justify-center items-center font-bold uppercase text-xl z-50">
                <img src="images/ai_quiz_logo.png" alt="logo" width={56} height={29}
                     className="hover:scale-105 duration-300 ease-linear animate-pulse"/>
                <h1 className="px-2 shadow-2xl hover:shadow-green-500 hover:text-indigo-600 ease-in-out duration-300">QuizBotIQ</h1>
            </NavLink>

            <ul className="hidden h-full gap-12 lg:flex">
                <HashLink to="/#pricing-section" smooth
                          className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                    Pricing
                </HashLink>
                <li className="p-4 hover:border-b rounded-full hover:text-black active:bg-amber-300 hover:bg-orange-300 transition duration-700 ease-in-out relative group">
                    <div className="flex items-center group regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                        QUIZZES
                        <ChevronUp size={24} className="transform group-hover:rotate-180 duration-300 ease-in"/>
                    </div>

                    <div
                        className="absolute mt-2 top-full left-1/2 transform -translate-x-1/2 w-64 bg-white p-2 rounded-xl shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <div
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                        <h3 className="font-bold text-lg mb-4 text-black text-center">
                            ANYTHING IN MIND
                        </h3>
                        <ul className="space-y-2">
                            <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 cursor-pointer text-center">
                                <Link to="/quiz/list" className="text-white hover:text-gray-200">
                                    ALL QUIZZES
                                </Link>
                            </li>

                            {state.user &&
                                <li className="py-1 px-4 rounded-full bg-gray-500 text-md hover:text-red-400 hover:bg-gray-700 text-center">
                                    <Link to="/quiz/create-quiz" className="text-white hover:text-gray-200">
                                        CREATE QUIZ
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                </li>
                <NavLink to="/leader-board"
                         className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                    Leader Board
                </NavLink>
                {
                    state.user?.roles?.includes(Role.ADMIN) &&
                    <NavLink to="/admin/system-stats"
                             className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                        Admin Dashboard
                    </NavLink>
                }
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

            <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto lg:hidden"
            >
                <NavLink to="/" className="flex justify-center items-center font-bold uppercase text-xl z-50 mt-2">
                    <img src="images/ai_quiz_logo.png" alt="logo" width={56} height={29}
                         className="hover:scale-105 duration-300 ease-linear animate-pulse"/>
                    <h1 className="px-2 shadow-2xl hover:shadow-green-500 hover:text-indigo-600 ease-in-out duration-300">QuizBotIQ</h1>
                </NavLink>
                <ul className="h-full gap-12 flex flex-col items-center justify-center">
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
            </motion.div>

            <div onClick={() => {
                console.log("from the div");
                toggleMenu();
            }} className="lg:hidden cursor-pointer text-red-500">
                {isOpen ? <X size={32}/> : <MenuIcon size={32}/>}
            </div>
        </nav>
    );
}