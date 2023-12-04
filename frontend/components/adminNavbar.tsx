import {NavLink} from "react-router-dom";
import {ActivitySquare, CircuitBoard, FileQuestion, User} from "lucide-react";
import React from "react";

export default function AdminNavbar() {
    return (
        <div className="flex flex-row items-center justify-center m-2 rounded-full">
            <NavLink to={"/dashboard/admin/activity"} className={({isActive}) => {
                if (isActive) return "bg-purple-800 text-white p-3 rounded-lg inline-block hover:opacity-75 duration-300 ease-linear";
                else return "bg-gray-300 text-black p-3 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in";
            }}>
                <div className="flex">
                    <ActivitySquare/>
                    Status
                </div>
            </NavLink>
            <span className="border-gray-200 p-2"></span>
            <NavLink to={"/dashboard/admin/activity"} className={({isActive}) => {
                if (isActive) return "bg-purple-800 text-white p-3 m-1 rounded-lg inline-block hover:opacity-75 duration-300 ease-linear";
                else return "bg-gray-300 text-black p-3 m-1 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in";
            }}>
                <div className="flex">
                    <User size={24}/>
                    Users
                </div>
            </NavLink>
            <NavLink to={"admin/faq-ops"} className={({isActive}) => {
                if (isActive) return "bg-purple-800 text-white p-3 m-1 rounded-lg inline-block hover:opacity-75 duration-300 ease-linear";
                else return "bg-gray-300 text-black p-3 m-1 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in";
            }}>
                <div className="flex">
                    <FileQuestion size={24}/>
                    FAQ
                </div>
            </NavLink>
            <NavLink to={"/dashboard/admin/activity"} className={({isActive}) => {
                if (isActive) return "bg-purple-800 text-white p-3 m-1 rounded-lg inline-block hover:opacity-75 duration-300 ease-linear";
                else return "bg-gray-300 text-black p-3 m-1 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in";
            }}>
                <div className="flex">
                    <CircuitBoard size={24}/>
                    Quizzes
                </div>
            </NavLink>
        </div>
    );
}