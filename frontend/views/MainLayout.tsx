import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {useAuth} from 'Frontend/util/auth.js';
import {useRouteMetadata} from 'Frontend/util/routing.js';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const navLinkClasses = ({isActive}: any) => {
    return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {
    const currentTitle = useRouteMetadata()?.title ?? 'My App';
    const {state, logout} = useAuth();
    const profilePictureUrl =
        state.user &&
        `data:image;base64,${btoa(
            state.user.profilePicture.reduce((str, n) => str + String.fromCharCode((n + 256) % 256), '')
        )}`;
    return (
        <>

<div className="flex flex-col justify-between min-h-screen">
            <Navbar/>
            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
            <Footer/>
</div>
        </>
    );
}
