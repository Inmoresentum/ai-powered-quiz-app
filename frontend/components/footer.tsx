import {Dribbble, Facebook, Github, Instagram, Twitter} from "lucide-react";
import {NavLink} from "react-router-dom";

export default function Footer() {
    return (
        <div className="w-full bg-white py-16 px-4 wavy-footer">
            <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-2 gap-8 text-gray-300'>
                <div>
                    <div className="flex text-3xl font-bold text-[#00df9a] uppercase items-center">
                        <NavLink className="peer rounded-md" to={"/"}>
                            <img
                                className="rounded-2xl hover:scale-110 duration-300 ease-linear animate-pulse"
                                src="/images/ai_quiz_logo.png"
                                width={56} height={29}
                                alt="logo"/>
                        </NavLink>
                        <NavLink className="peer-hover:text-purple-500 transition-colors duration-300
                     ease-in-out peer-hover:animate-pulse" to="/">
                            <h1 className="px-2 text-white shadow-2xl hover:shadow-green-500 hover:text-indigo-600 ease-in-out duration-300">QuizBotIQ</h1>
                        </NavLink>
                    </div>
                    <p className='py-4'>Thank you for choosing our quiz platform! We're dedicated to making learning
                        engaging and enjoyable. Explore our diverse range of quizzes to challenge your mind and expand
                        your knowledge. Join our community of curious learners, share your insights, and connect with
                        fellow enthusiasts. Your feedback is invaluable in shaping a better experience for everyone.
                        Start your learning journey today and embark on an adventure of discovery!</p>
                    <div className='flex justify-between md:w-[75%] my-6 mr-6'>
                        <a href="https://www.facebook.com/">
                            <Facebook size={30}
                                      className="hover:cursor-pointer hover:text-orange-600 hover:scale-110 transition-all duration-500"/>
                        </a>
                        <a href="https://www.instagram.com/">
                            <Instagram size={30}
                                       className="hover:cursor-pointer hover:text-pink-500 hover:scale-110 transition-all duration-500"/>
                        </a>
                        <a href="https://twitter.com/">
                            <Twitter size={30}
                                     className="hover:cursor-pointer hover:text-blue-600 hover:scale-110 transition-all duration-500"/>
                        </a>
                        <a href="https://github.com/">
                            <Github size={30}
                                    className="hover:cursor-pointer hover:text-teal-600 hover:scale-110 transition-all duration-500"/>
                        </a>
                        <a href="https://dribbble.com/">
                            <Dribbble size={30}
                                      className="hover:cursor-pointer hover:text-yellow-300 hover:scale-110 transition-all duration-500"/>
                        </a>
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div>
                        <h6 className='font-medium text-gray-400'>Solutions</h6>
                        <ul>
                            <li className='py-2 text-sm'>Analytics</li>
                            <li className='py-2 text-sm'>Marketing</li>
                            <li className='py-2 text-sm'>Commerce</li>
                            <li className='py-2 text-sm'>Insights</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Support</h6>
                        <ul>
                            <li className='py-2 text-sm'><a href="#">Pricing</a></li>
                            <li className='py-2 text-sm'>Documentation</li>
                            <li className='py-2 text-sm'>Guides</li>
                            <li className='py-2 text-sm'>API Status</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Company</h6>
                        <ul>
                            <li className='py-2 text-sm'>About</li>
                            <li className='py-2 text-sm'>Blog</li>
                            <li className='py-2 text-sm'>Jobs</li>
                            <li className='py-2 text-sm'>Press</li>
                            <li className='py-2 text-sm'>Careers</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Legal</h6>
                        <ul>
                            <li className='py-2 text-sm'>Claim</li>
                            <li className='py-2 text-sm'><a href="#">Policy</a></li>
                            <li className='py-2 text-sm'><a href="#">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
