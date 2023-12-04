import {Outlet} from "react-router-dom";
import AdminNavbar from "@/components/adminNavbar";

export default function AdminDashboardLayout() {
    return (
        <>
            <AdminNavbar/>
            <Outlet/>
        </>
    );
}