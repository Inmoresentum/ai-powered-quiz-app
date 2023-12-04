import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CookieConsentWrapper from "@/components/CookieConsent";

export default function MainLayout() {
    return (
        <>
            <div className="flex flex-col justify-between min-h-screen">
                <CookieConsentWrapper/>
                <Navbar/>
                <Suspense fallback={<Placeholder/>}>
                    <Outlet/>
                </Suspense>
                <Footer/>
            </div>
        </>
    );
}
